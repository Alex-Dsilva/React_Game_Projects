import styles from "./Alert.module.scss";

function Alert({ content, setAlert }) {
  return (
    <div className={styles.main}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p>Alert</p>
        <button
          onClick={() => setAlert({ diplay: false })}
          className={styles.close_wrapper}
        >
          &times;
        </button>
      </div>
      <p className={styles.content}>{content}</p>
    </div>
  );
}

export default Alert;
