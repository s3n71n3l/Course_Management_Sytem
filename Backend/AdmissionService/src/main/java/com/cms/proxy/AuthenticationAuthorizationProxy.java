package com.cms.proxy;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="SecurityService", url="http://localhost:9098/app")
public interface AuthenticationAuthorizationProxy {
	
	@GetMapping("/validateToken/{authorization}")
	public boolean isValidToken(@PathVariable String authorization);
	

}
