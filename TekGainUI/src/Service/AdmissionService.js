import axios from 'axios';

const BASE_URL="http://localhost:7777/admission";
 
class AdmissionService{
  register(associateId, courseId){
    const admissionData = {
      associateId: associateId,
      courseId: courseId,
    };
    return axios.post(BASE_URL+`/register/${associateId}/${courseId}`, admissionData);
  }

  calculateFees(courseId){
    return axios.put(BASE_URL+`/calculateFees/${courseId}`);
  }

  addFeedback(regNo,feedback,feedbackRating){
    return axios.post(BASE_URL+`/feedback/${regNo}/${feedback}/${feedbackRating}`);
  }
  viewFeedbackByCourseId(courseId){
    return axios.get(BASE_URL+`/viewFeedbackByCourseId/${courseId}`);
  }

  highestFee(associateId){
    return axios.get(BASE_URL+`/highestFee/${associateId}`);
  }

}
const admissionService = new AdmissionService();
export default admissionService;
