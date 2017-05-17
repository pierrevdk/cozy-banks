import styles from '../styles/groupes'
import classNames from 'classnames'

import React, { Component } from 'react'

import Toggle from 'cozy-ui/react/Toggle'
import Modal from 'cozy-ui/react/Modal'

const GroupModal = ({ group, onClose }) => (
  <Modal
    title={'Editer le groupe'}
    secondaryAction={onClose}
  >
    <form className={styles['bnk-form']}>
      <label className={styles['coz-form-label']}>
        Libellé
      </label>
      <input type="text" value={group.label} />

      <label className={styles['coz-form-label']}>
        Comptes
      </label>
      <table className={styles['coz-table-modal']}>
        <tbody className={styles['coz-table-body']}>
          <tr className={styles['coz-table-row']}>
            <td className={classNames(styles['coz-table-cell'])}>
              CCHQ
            </td>
            <td className={classNames(styles['coz-table-cell'])}>
              97896768734
            </td>
            <td className={classNames(styles['coz-table-cell'])}>
              <Toggle name="a" />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </Modal>
)

class Groups extends Component {
  constructor (props) {
    super(props)

    this.state = {
      editingGroup: null
    }
  }
  addGroup () {
    this.setState({
      editingGroup: {
        label: 'Group name',
        accounts: []
      }
    })
  }
  editGroup (group) {
    this.setState({
      editingGroup: group
    })
  }
  saveGroupChange (data) {
    this.setState({
      editingGroup: null
    })
  }
  render (props, state) {
    const { groups } = props
    const { editingGroup } = state

    return (
      <div>
        <h4>
          Groupes
        </h4>

        <table className={styles['coz-table']}>
          <tr className={classNames(styles['coz-table-head'], styles['coz-table-row'])}>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-libelle'])}>
              Libellé
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-comptes'])}>
              Comptes
            </th>
            <th className={classNames(styles['coz-table-header'], styles['bnk-table-actions'])} />
          </tr>
          <tbody className={styles['coz-table-body']}>
            { groups.map(group => (
              <tr className={styles['coz-table-row']}>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-libelle'])}>
                  {group.label}
                </td>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-comptes'])}>

                </td>
                <td className={classNames(styles['coz-table-cell'], styles['bnk-table-actions'])}>
                  <button className={styles['bnk-action-button']} onClick={this.editGroup.bind(this, group)}>
                    éditer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        { editingGroup !== null &&
          <GroupModal
            group={editingGroup}
            onClose={this.saveGroupChange.bind(this)}
          />
        }

        <button className={classNames(styles['bnk-action-button'], styles['icon-plus'])} onClick={this.addGroup.bind(this)}>
          Créer un groupe
        </button>
      </div>
    )
  }
}

export default Groups
