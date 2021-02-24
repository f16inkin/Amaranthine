import * as actions from './actions'
import * as mutations from './mutations'

const state = {
  count: 1,
  currentView: 'Card',
  patientCard: {
    CardId: null,
    CardNumber: null,
    Surname: null,
    FirstName: null,
    SecondName: null,
    Gender: null,
    DateBirth: null,
    DateDeath: null,
    IsAlive: null,
    PhoneNumber: null,
    Email: null,
    PolicyNumber: null,
    InsuranceCompanyId: null,
    InsuranceCompanyName: null,
    InsuranceCertificate: null,
    PassportSerial: null,
    PassportNumber: null,
    PassportDateOfIssue: null,
    FmsDepartment: null,
    BirthCertificateSerial: null,
    BirthCertificateNumber: null,
    BirthCertificateDateOfIssue: null,
    RegistryOffice: null,
    Workplace: null,
    Profession: null,
    Notation: null,
    Owner: null
  },
  patientCardAddresses: [],
  patientCards: {
    Cards: [],
    PagesCounts: 0,
    PageOrder: 'First'
  },
  insuranceCompanies: [],
  dispositions: {
    regions: [],
    districts: [],
    localities: [],
    streets: []
  },
  fluorographies: [],
  fluorographyOptions: [],
  vaccinations: [],
  vaccinationOptions: []
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
