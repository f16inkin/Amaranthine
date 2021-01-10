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
    RegionId: null,
    RegionName: null,
    DistrictId: null,
    DistrictName: null,
    LocalityId: null,
    LocalityName: null,
    StreetId: null,
    StreetName: null,
    HouseNumber: null,
    Apartment: null,
    Workplace: null,
    Profession: null,
    Notation: null,
    Owner: null
  },
  patientCards: {
    Cards:[],
    PagesCounts: 0,
    PageOrder: 'First'
  },
  insuranceCompanies: [],
  dispositions: {
    regions: [],
    districts: [],
    localities: [],
    streets: []
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
