package com.cms.controller;

import java.util.List;
import org.springframework.web.bind.annotation.RequestHeader;


import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cms.config.RabbitMQConfig;
import com.cms.exception.AdmissionInvalidException;
import com.cms.model.Admission;
import com.cms.proxy.AuthenticationAuthorizationProxy;
import com.cms.proxy.CourseProxy;
import com.cms.proxy.ServiceProxy;
import com.cms.service.AdmissionServiceImpl;
import com.cms.model.Course;
import com.cms.model.Associate;
import com.cms.payment.*;

import com.cms.payment.Order;
import com.cms.payment.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import java.io.IOException;
import java.util.List;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.core.Queue;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@RestController
@RequestMapping("/admission")
//@CrossOrigin(origins="*", allowedHeaders="*")
public class AdmissionController {
	
	@Autowired
	private AdmissionServiceImpl admissionServiceImpl;
	
	@Autowired
	private CourseProxy courseProxy;
	
	@Autowired
	private ServiceProxy associateProxy;
	
	@Autowired
	AuthenticationAuthorizationProxy auth;
	
//	@Autowired
//    PaypalService paypalService;
	
	@Autowired
    private JavaMailSender javaMailSender;
	@Value("${spring.mail.username}")
    private String sender;
	
//	   public static final String SUCCESS_URL = "pay/success";
//	    public static final String CANCEL_URL = "pay/cancel";
	
	@PostMapping("/register/{associateId}/{courseId}")
	public ResponseEntity<Admission> registerAssociateForCourse(@RequestBody Admission admission, @PathVariable String associateId, @PathVariable String courseId) throws AdmissionInvalidException{
		ResponseEntity<Course> course= courseProxy.viewByCourseId(courseId);
		ResponseEntity<Associate> associate= associateProxy.viewByAssociateId(associateId);
		
        
		if(course.getStatusCode() == HttpStatus.OK && associate.getStatusCode() == HttpStatus.OK) {
//			return ResponseEntity.ok( admissionServiceImpl.registerAssociateForCourse(admission));
			Course courses = course.getBody();
			admission.setFees(courses.getFees());
			Admission registeredAdmission =  admissionServiceImpl.registerAssociateForCourse(admission);
			
			if (registeredAdmission != null) {
                String message = "Registration Details:\n" +
                        "Associate ID: " + associateId + "\n" +
                        "Course ID: " + courseId + "\n" +
                        "Registration Number: " + registeredAdmission.getRegistrationId();

//                 Send registration details to the RabbitMQ queue
//                rabbitTemplate.convertAndSend(queue.getName(), message);

//                 Send registration email to the associate
                sendRegistrationEmail(associate.getBody().getAssociateEmailId(), associateId, courseId,
                        registeredAdmission.getRegistrationId());

                return ResponseEntity.ok(registeredAdmission);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
		}else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
		
	}
	
	private void sendRegistrationEmail(String recipientEmail, String associateId, String courseId,long registrationNumber) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(sender);
        message.setTo(recipientEmail); // Set the recipient email address
        message.setSubject("Registration Confirmation");
        message.setText("Dear Associate,\n\nCongratulations! You have successfully registered for the course.\n\n" +
                "Registration Details:\n" +
                "Associate ID: " + associateId + "\n" +
                "Course ID: " + courseId + "\n" +
                "Registration Number: " + registrationNumber);
        javaMailSender.send(message);
    }
	
	@PutMapping("/calculateFees/{associateId}")
	public ResponseEntity<Object> calculateFees(@PathVariable String associateId) throws AdmissionInvalidException{
		 try {
	            ResponseEntity<Associate> associateResponse = associateProxy.viewByAssociateId(associateId);
	            boolean isAssociateFound = associateResponse.getStatusCode().is2xxSuccessful();

	            if (isAssociateFound) {
	                int fees = admissionServiceImpl.calculateFees(associateId);
	                return ResponseEntity.ok(fees);
	            } else {
	                // Return not found response if either course or associate is not found
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	            }
	        } catch (AdmissionInvalidException e) {
	            // Return internal server error response if admission is invalid or any
	            // exception occurs
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	        }
	}
	
	@PostMapping("/feedback/{regisrationId}/{feedback}/{rating}")
	public ResponseEntity<Object> addFeedback(@PathVariable Long regisrationId,@PathVariable String feedback,@PathVariable float rating) throws AdmissionInvalidException{
		try {
            // Add feedback for the admission
            Admission admission = admissionServiceImpl.addFeedback(regisrationId, feedback, rating);
            if (admission != null) {
                String courseId = admission.getCourseId();
                // Calculate the average feedback rating and update the course
                courseProxy.calculateAverageFeedbackAndUpdate(courseId, rating);
                return ResponseEntity.ok(admission);
            } else {
                // Admission not found
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (AdmissionInvalidException e) {
            // Invalid admission
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
		
	}
	
	@GetMapping("/highestFee/{associateId}")
	public ResponseEntity<List<String>> highestFeeForTheRegisteredCourse(@PathVariable String associateId) throws AdmissionInvalidException{
		try {
            // Retrieve the courseIds with the highest fee for the given associateId
            List<String> courses = admissionServiceImpl.highestFeeForTheRegisteredCourse(associateId);
            // Return the courseIds in the response body
            return ResponseEntity.ok(courses);
        } catch (AdmissionInvalidException e) {
            // Invalid admission or no registered courses found for the associate
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
	}
	
	@GetMapping("/viewFeedbackByCourseId/{courseId}")
	public ResponseEntity<List<String>> viewFeedbackByCourseId(@PathVariable String courseId) {
		try {
            // Retrieve the feedback list for the given courseId
            List<String> feedbackList = admissionServiceImpl.viewFeedbackByCourseId(courseId);
            return ResponseEntity.ok(feedbackList);
        } catch (AdmissionInvalidException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
	}
	
	@DeleteMapping("/deactivate/{courseId}")
	public ResponseEntity<Object> deactivateCourse(@PathVariable String courseId) throws AdmissionInvalidException {
		try {
            // Deactivate the admission associated with the given courseId
            boolean deactivated = admissionServiceImpl.deactivateAdmission(courseId);
            return ResponseEntity.ok(deactivated);
        } catch (AdmissionInvalidException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
	}
	
//	@PostMapping("/makePayment/{registrationId}/{fees}")
//	public ResponseEntity<String> makePayment(@PathVariable int registrationId, @PathVariable int fees) throws IOException{
//		boolean paymentMade = false;
//
//        try {
//            paymentMade = admissionServiceImpl.makePayment(registrationId);
//        } catch (AdmissionInvalidException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//        }
//
//        try {
//            if (paymentMade) {
//                Order order = new Order(fees, "USD", "paypal", "sale", "Admission Fees");
//                Payment payment = paypalService.createPayment(order.getPrice(), order.getCurrency(), order.getMethod(),
//                        order.getIntent(), order.getDescription(), "http://localhost:4200/" + CANCEL_URL,
//                        "http://localhost:4200/" + SUCCESS_URL);
//                for (Links link : payment.getLinks()) {
//                    if (link.getRel().equals("approval_url")) {
//                        String json = "{\"approval_url\":\"" + link.getHref() + "\"}";
//                        return ResponseEntity.ok(json);
//                    }
//                }
//            }
//
//        } catch (PayPalRESTException e) {
//           return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//        }
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//	}
	
	@GetMapping("/viewAll")
	public List<Admission>viewAll(){
		return admissionServiceImpl.viewAll();
	}
	
//	@GetMapping(value = SUCCESS_URL)
//    public String successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
//        try {
//            Payment payment = paypalService.executePayment(paymentId, payerId);
//            System.out.println(payment.toJSON());
//            if (payment.getState().equals("approved")) {
//                return "success";
//            }
//        } catch (PayPalRESTException e) {
//            System.out.println(e.getMessage());
//        }
//        return "redirect:/";
//    }
	
}
