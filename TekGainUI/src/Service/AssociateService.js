import axios from 'axios';

const BASE_URL="http://localhost:7777/associate";
 
class AssociateService{
  addAssociate(associate){
    return axios.post(BASE_URL+"/addAssociate", associate);
  }

  updateAssociate(associateId, associateAddr){
    return axios.put(BASE_URL+`/updateAssociate/${associateId}/${associateAddr}`);
  }

  viewAssociateById(associateId){
    return axios.get(BASE_URL+`/viewByAssociateId/${associateId}`);
  }

}
const associateService = new AssociateService();
export default associateService;

