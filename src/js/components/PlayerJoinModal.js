import React, { Component } from 'react'
import classNames from 'classnames'
import { Modal, Button } from 'react-bootstrap'

export default class PlayerJoinModal extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var { showModal, closeModal } = this.props
    return (
      <div>
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
