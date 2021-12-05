import {MstDocumentTypeResponse} from './mst-document-type-response.model';

export interface SoftDocument {
  id?: number;
  index?: string;
  createdAt?: Date;
  created_at?: string;
  created_by?: string;
  documentType?: MstDocumentTypeResponse;
  document_type?: string;
  document_name?: string;
  dms_ref?: string;
  isForeign?: boolean;
  isServiceRequestDocument?: boolean;  // DYNAMIC
  note?: string;
  isAttachToEmployer?: boolean;  // DYNAMIC
  isAttachToPerson?: boolean; // DYNAMIC
  isSelected?: boolean;
  isNewlyAdded?: boolean;
}
