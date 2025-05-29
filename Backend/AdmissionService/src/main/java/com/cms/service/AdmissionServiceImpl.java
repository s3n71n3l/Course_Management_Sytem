package com.cms.service;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.cms.exception.AdmissionInvalidException;
import com.cms.model.Admission;
import com.cms.model.Course;
import com.cms.repository.AdmissionRepository;
import com.cms.service.*;
import com.cms.payment.*;
import com.cms.proxy.CourseProxy;

@Service
public class AdmissionServiceImpl implements IAdmissionService {

	@Autowired
	private AdmissionRepository admissionRepository;
	
	@Autowired 
	CourseProxy courseProxy;
	
	@Autowired
	private SequenceGeneratorService seqGen;
	
//	public static final String SUCCESS_URL = "pay/success";
//	public static final String CANCEL_URL = "pay/cancel";
	
	public Admission registerAssociateForCourse(Admission admission)throws AdmissionInvalidException {
		
		
		if(admissionRepository.existsByRegistrationId(admission.getRegistrationId())) {
			throw new AdmissionInvalidException("admission with given associate id already exists");
		}
		long registrationId = seqGen.generateAdmissionId();
		admission.setRegistrationId(registrationId);
	
		
		admissionRepository.save(admission);
		
		
		
		return admission;
	}

	public int calculateFees(String associateId)throws AdmissionInvalidException {
		try {
			// Find admissions by associateId from the admission repository
			List<Admission> admissions = admissionRepository.findCoursesByAssociateId(associateId);
			if (admissions == null) {
				// Throw AdmissionInvalidException if admissions is null
				throw new AdmissionInvalidException("AssociateId does not exists");
			}
			int totalFees = 0;
			// Iterate through each admission and sum up the fees
			for (Admission admission : admissions) {
				totalFees += admission.getFees();
			}
			// Return the total fees calculated
			return totalFees;
		} catch (Exception e) {
			// Throw AdmissionInvalidException if any exception occurs during the
			// calculation
			throw new AdmissionInvalidException(e.getMessage());
		}
	}

	
	public Admission addFeedback(Long regNo, String feedback, float feedbackRating) throws AdmissionInvalidException {
		// Find the admission by registration number
				Admission admission = admissionRepository.findById(regNo).orElse(null);
				// Check if the admission exists
				if (admission == null) {
					throw new AdmissionInvalidException("Invalid Registration Id");
				}
				// Set the feedback for the admission
				admission.setFeedback(feedback);
				// Save the updated admission
				return admissionRepository.save(admission);
	}

	public List<String> highestFeeForTheRegisteredCourse(String associateId)throws AdmissionInvalidException {
		List<Admission> admissions = admissionRepository.findCoursesByAssociateId(associateId);
		// Check if any admissions exist for the associate
		if (admissions.isEmpty()) {
			throw new AdmissionInvalidException("No registered courses found for the associate.");
		}
		// Find the highest fee among the admissions
		double highestFee = 0.0;
		for (Admission admission : admissions) {
			if (admission.getFees() > highestFee) {
				highestFee = admission.getFees();
			}
		}
		// Collect the courseIds with the highest fee
		List<String> coursesWithHighestFee = new ArrayList<>();
		for (Admission admission : admissions) {
			if (admission.getFees() == highestFee) {
				coursesWithHighestFee.add(admission.getCourseId());
			}
		}
		return coursesWithHighestFee;
		
	}

	public List<String> viewFeedbackByCourseId(String courseId) throws AdmissionInvalidException {
//		List<String>feedback = admissionRepository.getFeedbackByCourseId(courseId);
		List<Admission> admissions = admissionRepository.findByCourseId(courseId);

		// Check if any admissions exist for the courseId
		if (admissions.isEmpty()) {
			throw new AdmissionInvalidException("No admissions found for the given course ID.");
		}

		// Collect the feedback from the admissions into a list
		List<String> feedbackList = new ArrayList<>();
		for (Admission admission : admissions) {
			feedbackList.add(admission.getFeedback());
		}

		return feedbackList;
		
	}

	public boolean deactivateAdmission(String courseId)throws AdmissionInvalidException {
		List<Admission> admissions = admissionRepository.findByCourseId(courseId);

		// Check if any admissions exist for the courseId
		if (admissions.isEmpty()) {
			throw new AdmissionInvalidException("No admissions found for the given course ID.");
		}

		// Delete the admissions with the given courseId
		admissionRepository.deleteByCourseId(courseId);

		// Return true to indicate successful deactivation
		return true;
	}

	public boolean makePayment(int registartionId) throws AdmissionInvalidException{
//		Admission admission = admissionRepository.findById((long)registartionId).orElse(null);
//		boolean result=true;
//		if (admission == null) {
//			result=false;
//			throw new AdmissionInvalidException("Invalid Registration Id");
//		}
//		return result;
		return false;
	}

	@Override
	public List<Admission> viewAll() {
		return admissionRepository.findAll();
	}

}
