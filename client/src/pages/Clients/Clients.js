import React from 'react'
import Grid from '@mui/material/Grid'
import BasicCard from '../../components/common/BasicCard/BasicCard'
import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import EuroIcon from '@mui/icons-material/Euro'
import CakeIcon from '@mui/icons-material/Cake'
import DataLineIcon from '../../components/common/DataLine/DataLineIcon'
import DataLineAction from '../../components/common/DataLine/DataLineAction'
import DataLineHeader from '../../components/common/DataLine/DataLineHeader'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import { useFetchDataList } from '../../utils/useFetchDataList'
import Header from '../../components/common/Header/Header'

const Clients = () => {
  const [
    clients,
    setClients,
    clientsFiltered,
    setClientsFiltered,
    isLoading,
    error,
    setError,
  ] = useFetchDataList('clients')

  const handleFilter = (e) => {
    const pattern = e.target.value.toLowerCase()
    const result = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(pattern) ||
        client.firstname.toLowerCase().includes(pattern) ||
        client.email.toLowerCase().includes(pattern),
    )
    setClientsFiltered(result)
  }

  const getContent = (client) => {
    return (
      <>
        <DataLineHeader title={`${client.name} ${client.firstname}`} />
        <DataLineIcon icon={<CakeIcon />} text={client._age} />
        <DataLineIcon icon={<AlternateEmailIcon />} text={client.email} />
        <DataLineIcon icon={<PhoneIphoneIcon />} text={client.phone} />
        <DataLineIcon icon={<CalendarTodayIcon />} text="Rendez-vous..." />
        <DataLineIcon icon={<EuroIcon />} text="Paiements..." />
      </>
    )
  }

  const getAction = (id) => {
    return (
      <>
        <DataLineAction url="/clients/details" id={id} label="Détails" />
        <DataLineAction url="/clients/edit" id={id} label="Modifier" />
      </>
    )
  }

  if (isLoading) {
    return <CommonLoader />
  }

  return (
    <Box>
      <Header title="Liste de clients" href="/clients/add" action="Ajouter" />
      <TextField
        name="search"
        placeholder="Recherche dans le nom, le prénom et l'email"
        label="Filtre de recherche"
        variant="outlined"
        fullWidth
        onChange={handleFilter}
      />
      <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
        {clientsFiltered.map((client) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={client.id}>
              <BasicCard
                header=""
                content={getContent(client)}
                actions={getAction(client.slug)}
              ></BasicCard>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default Clients
