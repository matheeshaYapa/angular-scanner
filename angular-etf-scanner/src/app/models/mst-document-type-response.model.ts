 export interface MstDocumentTypeResponse {
   active?: boolean;
   created_at?: string;
   created_by?: number;
   created_organization?: number;
   description?: string;
   enf_callindirective_date_from_required?: boolean;
   enf_callindirective_date_to_required?: boolean;
   enf_callindirective_description_required?: boolean;
   enf_callindirective_document?: boolean;
   enf_employer_related_doc?: boolean;
   id?: number;
   inbound_document?: boolean;
   inova_print_template?: string;
   jasper_print_template?: string;
   last_ref_no?: number;
   legal_case_approval_required?: boolean;
   legal_case_boardpaper_related_doc?: boolean;
   legal_case_related_doc?: boolean;
   meta_data?: boolean;
   name_eng?: string;
   name_sin?: string;
   name_tam?: string;
   order_index?: number;
   outbound_document?: boolean;
   outbound_required?: boolean;
   prefix_ref_no?: string;
   reference_table?: string;
   show_employer_profile?: boolean;
   show_person_profile?: boolean;
   show_self_agent_profile?: boolean;
   surcharge_notice_related_doc?: boolean;
   system_code?: string;
   system_generated?: boolean;
   updated_at?: string;
   updated_by?: number;
   updated_organization?: number;
   upload_attachment?: boolean; 
}