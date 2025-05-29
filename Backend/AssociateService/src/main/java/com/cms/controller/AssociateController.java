package com.cms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cms.exception.AssociateInvalidException;
import com.cms.model.Associate;
import com.cms.service.IAssociateService;

@RestController
@RequestMapping("/associate")
//@CrossOrigin(origins="*", allowedHeaders="*")
public class AssociateController {

	@Autowired
	private IAssociateService associateService;

	public AssociateController(IAssociateService associateService) {
		this.associateService = associateService;
	}
	@PostMapping("/addAssociate")
	public ResponseEntity<?> addAssociate(@RequestBody Associate associate) {
		try {
			Associate addedAssociate = associateService.addAssociate(associate);
			return ResponseEntity.ok(addedAssociate);
		} catch (AssociateInvalidException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
	}

	@PutMapping("/updateAssociate/{associateId}/{associateAddress}")
	public ResponseEntity<?> updateAssociate(@PathVariable String associateId,@PathVariable String associateAddress) {
		try {
			Associate updatedAssociate = associateService.updateAssociate(associateId, associateAddress);
			return ResponseEntity.ok(updatedAssociate);
		} catch (AssociateInvalidException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
	}

	@GetMapping("/viewByAssociateId/{associateId}")
	public ResponseEntity<?> viewByAssociateId(@PathVariable String associateId) {
		try {
			Associate associate = associateService.viewByAssociateId(associateId);
			return ResponseEntity.ok(associate);
		} catch (AssociateInvalidException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

	@GetMapping("/viewAll")
    public ResponseEntity<List<Associate>> viewAll() {
        try {
            List<Associate> associates = associateService.viewAll();
            return ResponseEntity.ok(associates);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
  }
}

}