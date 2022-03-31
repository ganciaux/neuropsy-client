import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function CommonDialog({
  title,
  content,
  open,
  handleCloseOk,
  handleCloseCancel,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleCloseCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content && content()}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseCancel}>Annuler</Button>
        <Button onClick={handleCloseOk} autoFocus>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  )
}
