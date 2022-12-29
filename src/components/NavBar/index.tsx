// hooks
import { useMetamask } from 'contexts/Wallet';

// styles
import classes from './NavBar.module.scss';

// assets
import Logo from 'assets/logo.svg';
import { addBinanceToWallet } from 'helpers/addnetwork';

const Navbar = () => {
  const { account, connect, disconnect } = useMetamask();

  return (
    <nav className={classes.navbar}>
      <div className={classes.logoGroup}>
        <img src={Logo} className={classes.logo} alt="Logo" />
      </div>

      <div className={classes.right}>
        {account && (
          <p className={classes.account}>
            Connected{' '}
            <span className={classes.purpleColor}>
              {account.substr(0, 7)}...{account.substr(account.length - 7, account.length - 1)}
            </span>
          </p>
        )}
        <p className={classes.secondaryButton} onClick={addBinanceToWallet}>
          Add Binance Smart Chain to Metamask
        </p>
        <button className={classes.btn} onClick={account ? disconnect : connect}>
          <div className={classes.btnText}>{account ? 'Disconnect' : 'Connect Wallet'}</div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
