package com.tiffin.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tiffin.service.ViewVendorService;

@RestController
@CrossOrigin
@RequestMapping("/home")
public class HomePageController {
	@Autowired
	private ViewVendorService viewVendorService;
	
	@GetMapping()
	public ResponseEntity<?> viewVendor(){
		return ResponseEntity.status(HttpStatus.CREATED).body(viewVendorService.findAllVendors());
	}

//	@GetMapping("/vendorMenuList")
//	public ResponseEntity<?> vendorMenuList(@RequestBody String email){
//		System.out.println("email : "+email);
//		return ResponseEntity.status(HttpStatus.ACCEPTED).body(viewVendorService.getVendorMenuList(email));
//	}
	@PostMapping("/vendorMenuList")
	public ResponseEntity<?> vendorMenuList(@RequestBody Map<String, String> requestBody) {
	    String email = requestBody.get("email");
	    System.out.println("email : " + email);
	    return ResponseEntity.status(HttpStatus.ACCEPTED).body(viewVendorService.getVendorMenuList(email)); 
	}

}
