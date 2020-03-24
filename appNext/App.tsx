import React from 'react'
import { StateModel } from './models'
import { Provider, useSelector } from 'react-redux'
import { Store, AnyAction, Reducer } from 'redux'
import cn from 'classnames'
import './AppStyles.scss'
import styles from './AppModules.scss'
import { CountNewTypeModel } from './modules/countNewType/CountNewTypeModel'
import { CountNewTypeActions } from './modules/countNewType/CountNewTypeActions'

export const Container: React.FC = () => {
  const countNew = useSelector<StateModel.State, CountNewTypeModel.CountState>(state => state.countNewType.count)
  return (
    <section className={styles.container}>
      <h1 className={styles.container__title}>Count</h1>
      <article className={cn(styles.container__content, styles.countes)}>
        <div className={cn(styles.countes__item, styles.countFrame)}>
          <div className={styles.countFrame__value}>{countNew}</div>
          <button
            onClick={() => {
              CountNewTypeActions.increment()
            }}
            className={cn(styles.countFrame__btn, styles.button, styles.button_success)}
          >
            +
          </button>
          <button
            onClick={() => {
              CountNewTypeActions.decrement()
            }}
            className={cn(styles.countFrame__btn, styles.button)}
          >
            -
          </button>
        </div>
      </article>
    </section>
  )
}

export const App: React.FC<{
  store?: Store<StateModel.State, AnyAction> & {
    injectReducer: (key: string, asyncReducer: Reducer) => void
    asyncReducers: AnyAction | {}
  }
}> = props => {
  return (
    <Provider store={props.store}>
      <Container />
    </Provider>
  )
}
