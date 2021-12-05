// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  BASE_META_URL: 'http://etf.bu1.inova.lk/meta',
  BASE_DATA_URL: 'http://etf.bu1.inova.lk',
  BASE_DATA_AllOCATION_URL: 'http://etf.bu1.inova.lk',

  ADMIN_URIS: {
    SELF_EMPLOYMENT_CATEGORY: '/v1/master/self-employment-categories',
    ETFB_ZONE: '/v1/master/etfb-zones',
    ETFB_ZONE_PATCH: '/v1/master/patch27/etfb-zones',
    ETFB_ZONE_ACTIVE_LIST_BY_DISTRICT_ID: '/v1/master/etfb-zones/active/true/etfb-zone-districts/districts',
    ETFB_BRANCH: '/v1/master/organization/owner-types',
    MST_BANK: '/v1/master/banks',
    MST_OTHER_DEPOSIT: '/v1/master/other-deposit-types',
    MST_OTHER_WITHDRAWAL: '/v1/master/other-withdrawal-types',
    MST_CLAIM_DEATH_INSUARANCE_ELEGIBLE_DECIESE:
      '/v1/master/claim-death-insuarance-elegible-deciese',
    MST_COUNTRY: '/v1/master/countries',
    MST_COUNTRY_STATUS: '/v1/master/countries/active',
    MST_COUNTRIES_BY_NAME: '/v1/master/countries/sort/fieldname',
    MST_COURT_DS: '/v1/master/court-dses',
    MST_CURRENCY: '/v1/master/currencies',
    MST_ETFB_ZONE_DISTRICT: '/v1/master/master/etfb-zone-districts',
    MST_EXCHANGE_RATE: '/v1/master/master/exchange-rates',
    MST_LEGAL_CASE_ACTION: '/v1/master/master/legal-case-actions',
    MST_LEGAL_CASE_CATEGORY: '/v1/master/master/legal-case-categories',
    MST_LEGAL_CASE_EVENT_TYPE: '/v1/master/master/legal-case-event-types',
    MST_LEGAL_CASE_STAGE: '/v1/master/legal-case-stage/legal-case-sub-stages',
    MST_LOCAL_AUTHORITY_GOVERNMENT: '/v1/master/local-government-authorities',
    MST_ORGANIZATION_DESIGNATION: '/v1/master/organization-designations',
    MST_ORGANIZATION_ROLE: '/v1/master/organization-roles',
    MST_ORGANIZATION: '/v1/master/organizations',
    MST_ORGANIZATION_TYPE: '/v1/master/organization-categories',
    MST_REASON: '/v1/master/reasons',
    MST_REASON_SERVICE_REQUEST_EMPLOYER_UPDATE_REJECT: '/v1/master/reasons/service-request-employer-update-reject',
    MST_MEMBER_NEW_EMPLOYMENT_RESOLUTION: '/v1/master/member-new-employment-resolutions/sort/fieldname',
    MST_SELF_EMPLOYMENT_CATEGORY: '/v1/master/self-employment-categories',
    MST_SELF_EMPLOYMENT_Status: '/v1/master/self-employment-statuses',
    MST_SELF_EMPLOYMENT_NATURE_OF_BUISNESS:
      '/v1/master/self-employment-category-natures',
    MST_ETFB_ZONE: '/v1/master/etfb-zones',
    MST_PARTICIPATING_ETFB_BRANCH: '/v1/master/organization/owner-types',
    MST_DOCUMENT_TYPE: '/v1/master/document-types',
    MST_DOCUMENT_TYPE_FOR_ADD_DOCUMENT: '/v1/master/document-types/active/true/sort/fieldname/id',
    MST_SELF_EMPLOYMENT_NATURE_OF_BUSINESS:
      '/v1/master/self-employment-category-natures',
    MST_SELF_EMPLOYMENT_NATURE_OF_BUSINESS_SORT_BY_NAME_ENG:
      '/v1/master/self-employment-category-natures/sort/fieldname/nameEng',
    MST_SELF_EMPLOYMENT_NATURE_OF_BUSINESS_SORT_BY_ID:
      '/v1/master/self-employment-category-natures/sort/fieldname/id',
    MST_SERVICE_COUNTER_RESOLUTION_TYPE:
      '/v1/master/service-counter-resolution-types',
    MST_EMPLOYER_INDUSTRY_TYPE: '/v1/master/employer-industry-types',
    MST_EMPLOYER_INDUSTRY_TYPE_SORTED:
      '/v1/master/employer-industry-types/active/',
    MST_DIVISIONAL_SECETARIAT: '/v1/master/divisional-secretariats',
    MST_DIVISIONAL_SECETARIAT_SORTED:
      '/v1/master/divisional-secretariats/active',
    MST_DIVISIONAL_SECETARIAT_SORTED_BY_FIELD_NAME:
      '/v1/master/divisional-secretariats/sort/fieldname',
    MST_EMPLOYER_NATURE_BUSINESS: '/v1/master/employer-nature-businesses',
    // MST_DIVISIONAL_SECETARIAT: '/v1/master/districts',
    MST_POLICE_STATION: '/v1/master/police-stations',
    MST_POLICE_STATION_ACTIVE: '/v1/master/police-stations/active',
    MST_TITLE: '/v1/master/titles',
    MST_AWARENESS_PROGRAM_STATS: '/v1/master/awareness-program-statuses',
    MST_CONTACT_TYPE: '/v1/master/contact-types',
    MST_CONTACT_TYPE_SORT_BY_FIELD: '/v1/master/contact-types/active',
    MST_MSG_CONTACT_TYPE_SORT_BY_FIELD:
      '/v1/master/message-contact-types/sort/fieldname',
    MST_MEMBER_CATEGORY_ENUM: '/v1/enum/employed-member-category',
    MST_INCOMPLETE_MEMBER_MASTER_RESOLUTION: '/v1/master/incomplete-member-master-data-resolutions',
    MST_INCOMPLETE_MEMBER_MASTER_RESOLUTION_SORTED_BY_FEILD_NAME: '/v1/master/incomplete-member-master-data-resolutions/sort/fieldname',
    MST_MESSAGE_CONTACT_TYPE: '/v1/master/message-contact-types',
    MST_AWARENESS_PROGRAM_STATUS: '/v1/master/awareness-program-statuses',
    MST_GRAMA_NILADHARI_DIVISION: '/v1/master/grama-niladhari-divisions',
    MST_EMPLOYER_TYPE: '/v1/master/employer-types',
    MST_IN: '/v1/master/awareness-program-statuses',
    MST_INT_CALC_AMIC_STATUS: '/v1/master/int-calc-amic-statuses',
    MST_INT_CALC_AMIC_STATUS_BY_FIELD_NAME: '/v1/master/int-calc-amic-statuses/sort/fieldname/',
  },

  BUSSINESS_URIS: {
    COMMON_URI: {
      ASSIGNED_OFFICER_LIST_BY_SELECTED_ETFB_BRANCH: '/bu/v1/employer-relation/schedule-visit/assigned-officers/etfb-branches',
      DOCUMENTS: {
        SERVICE_REQUEST: {
          RESOLUTION_DOCUMENTS_BY_REF_NUMBER: '/bu/v1/service_request/resolution-documents/ref-no',
        },
        DOWNLOAD_DOCUMENT: '/bu/v1/document/ref-no',
        DOCUMENT_VIEW: '/bu/v1/documents/view/ref-no'

      },
      PERSON: {
        PERSON_CONTACT_DETAILS: '/bu/v1/person-update-resolution/contacts',
        PERSON_IDENTIVFICATION_DETAILS: '/bu/v1/member-relation/resolution/person-nic-detail'
      },
      SEARCH_MANAGE_AWARENESS_PROGRAM: '/bu/v1/member-relation/awareness-programs',
      GET_AWARENESS_PROGRAM: '/bu/v1/awareness-programs',
      PARTICIPATING_RO: '/bu/v1/master/participation-ros',
      SORT: '/bu/v1/sort',
      PERSON_SEARCH: '/bu/v1/persons/search',
      EMPLOYER_SEARCH: '/bu/v1/employers/search',
      EMPLOYER_SEARCH_VERIFICATION_PENDING: '/bu/v1/employers/search-pending-verifications',
      PERSON_DETAILS: '/bu/v1/person/',
      PERSON_DETAILS_BY_REF_NO: '/bu/v1/person/ref-no/',
      PERSON_GENERAL_DETAILS: '/bu/v1/person-generals',
      SHOW_OTHER_SERVICE_REQUESTS: '/bu/v1/service-desk/service-requests/ref-no/',
      readAllUsingGET_2: '/bu/v1/person/search-sort',
      readAllUsingGET: '/bu/v1/sort',
      GET_ETFB_BRANCHES_BY_USER_ID: '/bu/v1/common/etfb-users-organizations/'
    },
    DOCUMENT: {
      UPLOAD: '/bu/v1/documents',
      DOWNLOAD: '/bu/v1/documents/ref-no',
      UPDATE_NOTE: '/bu/v1/documents/note'
    },
    SERVICE_COUNTER: {
      DOCUMENTS: '/bu/v1/service-counter/documents/ref-no'
    },
    DMU_INBOUND: {
      DOCUMENTS: '/bu/v1/dmu-inbounds/documents/ref-no'
    },
    IMAGE_UPLOAD: {
      IMAGE: '/bu/v1/documents'
    }
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
