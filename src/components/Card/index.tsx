// hooks
import useInput from 'hooks/useInput';
import useSwitch from 'hooks/useSwitch';
import { useEffect, useRef, useState } from 'react';
import { useMetamask } from 'contexts/Wallet';

// libraries
import { toast } from 'react-toastify';

// components
import Spinner from '../Spinner';

// styles
import classes from 'components/Card/Card.module.scss';

// config
import { validateAmount } from 'helpers/validate';

// helpers
import Contracts from 'helpers/contracts';
import Web3 from 'helpers/web3';

const StakeCard = (props: any) => {
  const { stage } = props;
  const { account, isConnectedToAllowedNetwork, refresh } = useMetamask();
  const [totalDeposit, setTotalDeposit] = useState('0');
  const [earnedLP, setEarnedLP] = useState('0');
  const [balance, setBalance] = useState('0');
  const stakingAmount = useInput();
  const stakingSlippage = useInput('0.3');
  const withdrawSlippage = useInput('0.3');
  const stakingInProcess = useSwitch();
  const withdrawalInProcess = useSwitch();
  const showSlippage = useSwitch();
  const [amms, setAmms] = useState<any>([]);

  const fetchDetailsIntervalRef = useRef<any>();

  useEffect(() => {
    if (!account) {
      if (fetchDetailsIntervalRef.current) clearInterval(fetchDetailsIntervalRef.current);
      return;
    }

    const fetchDetails = async () => {
      const balance = await Web3.instance.eth.getBalance(account);
      const _earned = await Contracts.instances.VAULT.methods.getEarnedRewards(account).call();
      const _totalDeposit = await Contracts.instances.VAULT.methods.userDeposits(account).call();
      const _ammsLength = await Contracts.instances.VAULT.methods.getAmmsLength().call();
      setEarnedLP(Web3.instance.utils.fromWei(_earned));
      setTotalDeposit(Web3.instance.utils.fromWei(_totalDeposit));
      setBalance(Web3.instance.utils.fromWei(balance));
      const amms = await Promise.all(
        Array.from(Array(parseInt(_ammsLength)).keys()).map(async (i) => {
          let name = '';
          if (i === 0) name = 'Pancake Swap';
          else if (i === 1) name = 'Ape Swap';
          const balances = await Contracts.instances.VAULT.methods.ammBalances(i, account).call();
          return { name, balance: Web3.instance.utils.fromWei(balances.lpAmount) };
        }),
      );
      setAmms(amms);
    };

    fetchDetails();
    fetchDetailsIntervalRef.current = setInterval(fetchDetails, 2000);

    return () => {
      if (fetchDetailsIntervalRef.current) clearInterval(fetchDetailsIntervalRef.current);
    };
  }, [account]);

  const onStake = async () => {
    if (!account) {
      return toast.info('Please connect your wallet');
    }

    if (!(await isConnectedToAllowedNetwork())) {
      return toast.info('Please connect to one of the supported chains');
    }

    if (!validateAmount(stakingAmount.value)) {
      return;
    }

    try {
      stakingInProcess.true();
      const { VAULT } = Contracts.instances;
      const slippage = stakingSlippage.value;
      await VAULT.methods
        .deposit(Web3.instance.utils.toWei(slippage))
        .send({ from: account, value: Web3.instance.utils.toWei(stakingAmount.value) });
      toast.success('Staked Successfully');
      stakingAmount.reset();
      refresh.rerender();
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
    stakingInProcess.false();
  };

  const onWithdraw = async () => {
    if (!account) {
      return toast.info('Please connect to your wallet');
    }

    if (!(await isConnectedToAllowedNetwork())) {
      return toast.info('Please connect to one of the supported chains');
    }

    try {
      withdrawalInProcess.true();
      const { VAULT } = Contracts.instances;
      const slippage = withdrawSlippage.value;
      await VAULT.methods.withdraw(Web3.instance.utils.toWei(slippage)).send({ from: account });
      toast.success('Withdrawn Successfully');
      stakingAmount.reset();
      refresh.rerender();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
    withdrawalInProcess.false();
  };

  let input = null;
  let content = null;

  if (stage === 'Deposit') {
    content = (
      <div className={classes.balance}>
        <span>
          BNB <strong>{totalDeposit}</strong>
        </span>
      </div>
    );

    input = (
      <div className={classes.input}>
        <p style={{ marginBottom: 10 }}>Balance: {balance} BNB</p>
        <div>
          <div className={classes.stakingAmountInput}>
            <input
              min={0}
              type="number"
              placeholder="Amount"
              value={stakingAmount.value}
              onChange={stakingAmount.set}
              disabled={stakingInProcess.value}
            />
            <button onClick={() => stakingAmount.override(balance)}>MAX</button>
          </div>
          {showSlippage.value && (
            <div className={classes.slippageContainer}>
              <label>Slippage</label>
              <div className={classes.slippageInput}>
                <input
                  min={0.1}
                  max={50}
                  step={0.1}
                  type="range"
                  value={stakingSlippage.value}
                  onChange={stakingSlippage.set}
                  disabled={stakingInProcess.value}
                />
                <p>{stakingSlippage.value}</p>
              </div>
            </div>
          )}
        </div>
        <button onClick={onStake} disabled={stakingInProcess.value}>
          {stakingInProcess.value ? <Spinner /> : 'Deposit'}
        </button>
      </div>
    );
  } else if (stage === 'Withdraw') {
    content = (
      <div className={classes.balance}>
        <span>
          BNB <strong>{earnedLP}</strong>
        </span>
      </div>
    );

    input = (
      <div className={classes.input}>
        <div>
          {showSlippage.value && (
            <div className={classes.slippageContainer}>
              <label>Slippage</label>
              <div className={classes.slippageInput}>
                <input
                  min={0.1}
                  max={50}
                  step={0.1}
                  type="range"
                  value={withdrawSlippage.value}
                  onChange={withdrawSlippage.set}
                  disabled={withdrawalInProcess.value}
                />
                <p>{withdrawSlippage.value}</p>
              </div>
            </div>
          )}
        </div>
        <button onClick={onWithdraw} disabled={withdrawalInProcess.value}>
          {withdrawalInProcess.value ? <Spinner /> : 'Withdraw'}
        </button>
      </div>
    );
  }

  return (
    <div className={classes.card}>
      <p style={{ marginBottom: 40 }}>
        Pacific vault aggregates multiple AMMS for lp farming, the LPs are still subject to impermanent loss
        and/or bad execution prices.
      </p>
      <div className={classes.heading}>
        <span>{stage === 'Deposit' ? 'Total Deposit' : 'Rewards'}:</span>
        <span>{content}</span>
      </div>
      {parseFloat(totalDeposit) > 0 && (
        <div className={classes.amms}>
          {amms.map((amm: any) => (
            <div key={amm.name}>
              <span>{amm?.name}</span>
              <span>
                LP <strong>{amm?.balance}</strong>
              </span>
            </div>
          ))}
        </div>
      )}
      <div className={classes.center}>{input}</div>
      <p className={classes.slippage} onClick={showSlippage.toggle}>
        {showSlippage.value ? 'Hide Slippage' : 'Adjust Slippage'}
      </p>
    </div>
  );
};

export default StakeCard;
