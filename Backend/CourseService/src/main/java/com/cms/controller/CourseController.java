package com.cms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cms.exception.CourseInvalidException;
import com.cms.model.Course;
import com.cms.proxy.AdmissionProxy;
import com.cms.proxy.AuthenticationAuthorizationProxy;
import com.cms.service.CourseServiceImpl;
import java.util.List;
@RestController
@RequestMapping("/course")
//@CrossOrigin(origins="*", allowedHeaders="*")
public class CourseController {
	
    @Autowired
    CourseServiceImpl courseService;
    @Autowired
    AdmissionProxy admissionService;
    @Autowired
    AuthenticationAuthorizationProxy authService;
    
    
    
    @PostMapping("/addCourse")
    public ResponseEntity<Object> addCourse(@RequestBody Course course) {
//        if (!authService.isValidToken(authorization)) {
//            // If the token is not valid, return an unauthorized response
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
        try {
            Course savedCourse = courseService.addCourse(course);
            return ResponseEntity.ok(savedCourse);
        } catch (CourseInvalidException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/update/{courseId}/{duration}")
    public ResponseEntity<Object> updateCourse(@PathVariable("courseId") String courseId,
            @PathVariable("duration") Integer duration) {
//        if (!authService.isValidToken(authorization)) {
//            // If the token is not valid, return an unauthorized response
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
        try {
            Course updatedCourse = courseService.updateCourse(courseId, duration);
            return ResponseEntity.ok(updatedCourse);
           
        } catch (CourseInvalidException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/viewByCourseId/{courseId}")
    public ResponseEntity<Object> viewByCourseId(@PathVariable("courseId") String courseId) {
//        if (!authService.isValidToken(authorization)) {
//            // If the token is not valid, return an unauthorized response
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
        try {
            Course course = courseService.viewByCourseId(courseId);
            return ResponseEntity.ok(course);
            
        } catch (CourseInvalidException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @GetMapping("/viewFeedback/{courseId}")
    public ResponseEntity<Object> findFeedbackRatingForCourseId(@PathVariable("courseId") String courseId) {
//        if (!authService.isValidToken(authorization)) {
//            // If the token is not valid, return an unauthorized response
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
        try {
            float feedback = courseService.findFeedbackRatingForCourseId(courseId);
            return ResponseEntity.ok(feedback);     
        } catch (CourseInvalidException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/calculateAverageFeedback/{courseId}/{rating}")
    public ResponseEntity<Object> calculateAverageFeedback(
            @PathVariable("courseId") String courseId,
            @PathVariable("rating") float rating) {

//        if (!authService.isValidToken(authorization)) {
//            // If the token is not valid, return an unauthorized response
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
        try {
            Course updatedCourse = courseService.calculateAverageFeedbackAndUpdate(courseId, rating);
            return ResponseEntity.ok(updatedCourse);    
        } catch (CourseInvalidException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/deactivateCourse/{courseId}")
    public ResponseEntity<String> deactivateCourse(@PathVariable("courseId") String courseId) {
//        if (!authService.isValidToken(authorization)) {
//            // If the token is not valid, return an unauthorized response
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
        try {
            admissionService.deactivateAdmission(courseId);
            Course deactivatedCourse = courseService.deactivateCourse(courseId);
            if (deactivatedCourse != null) {
                return ResponseEntity.ok("Course deactivated successfully.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (CourseInvalidException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/viewAll")
    public ResponseEntity<List<Course>> viewAll() {
//        if (!authService.isValidToken(authorization)) {
//            // If the token is not valid, return an unauthorized response
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
        List<Course> courseList = courseService.viewAll();
        return ResponseEntity.ok(courseList);
    }


    public String fallback(){
	    return "Sorry,Service is unavailable";
	}

}
