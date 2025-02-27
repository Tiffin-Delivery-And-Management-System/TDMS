package com.tiffin.security;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtils utils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            Claims payloadClaims = utils.validateJwtToken(jwt);
            String email = utils.getUserNameFromJwtToken(payloadClaims);
            List<GrantedAuthority> authorities = utils.getAuthoritiesFromClaims(payloadClaims);

            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(token);
        }
        logger.info("JWT is valid. Proceeding with authentication.");
        filterChain.doFilter(request, response);
    }

//	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
//
//	@Override
//	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//			throws ServletException, IOException {
//		final String authHeader = request.getHeader("Authorization");
//
//		logger.info("🔎 Incoming Request: " + request.getMethod() + " " + request.getRequestURI());
//		logger.info("🔑 Received Authorization Header: " + authHeader);
//
//		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//			logger.warn("🚨 No Authorization header found or incorrect format!");
//			chain.doFilter(request, response);
//			return;
//		}
//
//		final String jwt = authHeader.substring(7);
//		logger.info("🔑 Extracted JWT: " + jwt);
//
//		// ✅ Validate JWT using JwtUtils
//		try {
//			Claims claims = utils.validateJwtToken(jwt);
//			logger.info("✅ JWT is valid. User: " + utils.getUserNameFromJwtToken(claims));
//	          List<GrantedAuthority> authorities = utils.getAuthoritiesFromClaims(claims);
//	          String email = utils.getUserNameFromJwtToken(claims);
//
//	            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email, null, authorities);
//	            SecurityContextHolder.getContext().setAuthentication(token);
//		} catch (Exception e) {
//			logger.warn("🚨 Invalid JWT Token! " + e.getMessage());
//			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//			return;
//		}
//
//		chain.doFilter(request, response);
//	}
}
