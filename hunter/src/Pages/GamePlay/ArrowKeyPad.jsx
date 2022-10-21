import styles from "./ArrowKeyPad.module.scss";

function ArrowKeyPad({ handleKeyDown }) {
  return (
    <div className={styles.main}>
      <div className="d-flex justify-content-center">
        <button onClick={() => handleKeyDown({ keyCode: 38 })}>&uarr;</button>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <button onClick={() => handleKeyDown({ keyCode: 37 })}>&larr;</button>
        <button onClick={() => handleKeyDown({ keyCode: 40 })}>&darr;</button>
        <button onClick={() => handleKeyDown({ keyCode: 39 })}>&rarr;</button>
      </div>
    </div>
  );
}

export default ArrowKeyPad;
