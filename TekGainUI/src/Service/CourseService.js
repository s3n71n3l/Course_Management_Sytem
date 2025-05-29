import axios from 'axios';


const BASE_URL="http://localhost:7777/course";
 
class CourseService{
  addCourse(course){
    return axios.post(BASE_URL+"/addCourse", course);
  }

  viewCourse(courseId ){
    return axios.get(BASE_URL+`/viewByCourseId/${courseId}`);
  }

  viewFeedback(courseId){
    return axios.get(BASE_URL+`/viewFeedback/${courseId}`);
  }

  deactivate(courseId, fees){
    return axios.delete(BASE_URL+`/deactivateCourse/${courseId}`, fees);
  }

  updateCourse(courseId, courseFees){
    return axios.put(BASE_URL+`/update/${courseId}/${courseFees}`)
  }
  
}
const courseService = new CourseService();
export default courseService;











