import styles from './Login.module.scss';
import logo from '../../assets/images/logo.svg';
import illustration from '../../assets/images/login-illustration.svg';

const Login = () => {
  return (
    <div className={styles.page}>
      <section className={styles.left}>
        <img className={styles.logo} src={logo} alt="Lendsqr" />
        <div className={styles.illustrationWrap}>
          <img
            className={styles.illustration}
            src={illustration}
            alt="Workspace illustration"
          />
        </div>
      </section>

      <section className={styles.right}>
        <div className={styles.formCard}>
          <h1 className={styles.title}>Welcome!</h1>
          <p className={styles.subtitle}>Enter details to login.</p>

          <form className={styles.form}>
            <label className={styles.label}>
              <span className={styles.srOnly}>Email</span>
              <input className={styles.input} type="email" placeholder="Email" />
            </label>

            <label className={styles.label}>
              <span className={styles.srOnly}>Password</span>
              <div className={styles.passwordField}>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Password"
                />
                <button className={styles.showBtn} type="button">
                  SHOW
                </button>
              </div>
            </label>

            <button className={styles.forgot} type="button">
              FORGOT PASSWORD?
            </button>

            <button className={styles.loginBtn} type="submit">
              LOG IN
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Login
