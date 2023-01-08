import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Ball from "./Ball";

function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((value, index) => index + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  const [winBalls, setWinBalls] = useState([]);
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers); // lazy init
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  const runTimeouts = () => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
  };

  const onClickRedo = useCallback(() => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, []);

  useEffect(() => {
    runTimeouts();
    return () => {
      timeouts.current.forEach((value) => {
        clearTimeout(value);
      });
    };
  }, [timeouts.current]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((value) => (
          <Ball key={value} number={value} />
        ))}
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={onClickRedo}>한 번 더!</button>}
      </div>
    </>
  );
};

// class Lotto extends Component {
//   state = {
//     winNumbers: getWinNumbers(), // 당첨 숫자들
//     winBalls: [],
//     bonus: null, // 보너스 공
//     redo: false,
//   };
//
//   timeouts = [];
//
//   runTimeouts = () => {
//     const { winNumbers } = this.state;
//     for (let i = 0; i < winNumbers.length - 1; i++) {
//       this.timeouts[i] = setTimeout(() => {
//         this.setState((prevState) => {
//           return {
//             winBalls: [...prevState.winBalls, winNumbers[i]],
//           };
//         });
//       }, (i + 1) * 1000);
//     }
//     this.timeouts[6] = setTimeout(() => {
//       this.setState({
//         bonus: winNumbers[6],
//         redo: true,
//       });
//     }, 7000);
//   };
//
//   componentDidMount() {
//     this.runTimeouts();
//   }
//
//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if (this.state.winBalls.length === 0) {
//       this.runTimeouts();
//     }
//   }
//
//   componentWillUnmount() {
//     this.timeouts.forEach((value) => {
//       clearTimeout(value);
//     });
//   }
//
//   onClickRedo = () => {
//     this.setState({
//       winNumbers: getWinNumbers(), // 당첨 숫자들
//       winBalls: [],
//       bonus: null, // 보너스 공
//       redo: false,
//     });
//     this.timeouts = [];
//   };
//
//   render() {
//     const { winBalls, bonus, redo } = this.state;
//     return (
//       <>
//         <div>당첨 숫자</div>
//         <div id="결과창">
//           {winBalls.map((value) => (
//             <Ball key={value} number={value} />
//           ))}
//           <div>보너스!</div>
//           {bonus && <Ball number={bonus} />}
//           {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
//         </div>
//       </>
//     );
//   }
// }

export default Lotto;
