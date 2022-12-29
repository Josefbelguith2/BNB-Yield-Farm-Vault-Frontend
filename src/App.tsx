import classes from 'App.module.scss';

// hooks
import useSwitch from 'hooks/useSwitch';
import useStage from 'hooks/useStage';

// components
import Navbar from 'components/NavBar';
import Card from 'components/Card';

const stages = { Staking: 'Deposit', Withdraw: 'Withdraw' };

function App() {
  const stage = useStage({ stages: stages, default: stages.Staking });
  const isStakingDisabled = useSwitch();

  return (
    <>
      <Navbar />

      <div className={classes.content}>
        <div>
          <div className={classes.modeSelectContainer}>
            {Object.keys(stages).map((key: string) => (
              <button
                key={key}
                onClick={stage.set[key]}
                disabled={
                  stages[key as 'Staking' | 'Withdraw'] === stages.Staking ? isStakingDisabled.value : false
                }
                className={stage.current === stages[key as 'Staking' | 'Withdraw'] ? classes.active : ''}>
                {stages[key as 'Staking' | 'Withdraw']}
              </button>
            ))}
          </div>

          <Card stage={stage.current} />
        </div>
      </div>
    </>
  );
}

export default App;
