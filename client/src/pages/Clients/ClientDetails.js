import { Button } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getData } from '../../api/api'
import CommonGridLine from '../../components/common/CommonGridLine/CommonGridLine'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import CommonLoaderAlert from '../../components/common/CommonLoader/CommonLoaderAlert'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'

const ClientDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isLoading, error, data } = useQuery('client', () =>
    getData('/clients', id),
  )

  if (isLoading) {
    return <CommonLoader />
  }

  if (error) {
    return (
      <CommonLoaderAlert
        title="List des clients"
        alertContent={error.message}
        href="/clients"
      />
    )
  }

  return (
    <CommonPageHeader title="Détail client">
      <CommonGridLine label="Nom" value={data.name} />
      <CommonGridLine label="Prénom" value={data.firstname} />
      <CommonGridLine label="Email" value={data.email} />
      <CommonGridLine label="Téléphone" value={data.phone} />
      <CommonGridLine label="Ville" value={data.city} />
      <CommonGridLine label="Code postal" value={data.zip} />
      <CommonGridLine label="Adresse" value={data.address} />
      <CommonGridLine label="Date de naissance" value={data._birthdate} />
      <CommonGridLine label="Age" value={data._age} />
      <CommonGridLine label="Description" value={data.description} />
      <Button
        sx={{ marginTop: '10px' }}
        type="button"
        variant="outlined"
        color="primary"
        href="/Clients"
      >
        Retour
      </Button>
      <Button
        sx={{ marginTop: '10px' }}
        type="button"
        variant="outlined"
        color="primary"
        onClick={() => navigate(`/clients/payment/${data.slug}`)}
      >
        Ajouter paiment
      </Button>
    </CommonPageHeader>
  )
}

export default ClientDetails
