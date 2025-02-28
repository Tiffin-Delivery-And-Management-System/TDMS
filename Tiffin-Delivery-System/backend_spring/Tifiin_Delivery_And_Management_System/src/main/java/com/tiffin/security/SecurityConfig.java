package com.tiffin.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

        @Autowired
        private JwtAuthenticationFilter jwtFilter;

        @Autowired
        private CustomAuthenticationEntryPoint authEntry;

        private static final String[] PUBLIC_ENDPOINTS = {
                        "/users/vendorSignup",
                        "/users/deliveryBoySignup",
                        "/users/vendorSignup",
                        "/users/signup",
                        "/users/signin",
                        "/v*/api-doc*/**",
                        "/swagger-ui/**",
                        "/home",
                        "/viewMenuOfVendor/{vendorId}",
                        "/admin/allReviews",
                        "/home/vendorMenuList",
                        "/orders/customerOrderHistory**",
                        "/deliveryCharges/{customerPincode}/{vendorPincode}"
        };

        private static final String[] VENDOR_ENDPOINTS = {
                        "/menus/**",
                        "/users/welcome",
                        "/orders/{vendorId}"
        };

        private static final String[] CUSTOMER_ENDPOINTS = {
                        "/users/addCustomerAddresses**",
                        "/orders/{customerId}/{vendorId}",
                        "/orders/addReview/{orderId}",
                        "/users/getCustomerAddresses",
                        
                       
                        
        };

        private static final String[] DELIVERY_BOY_ENDPOINTS = {
                        "/orders/changeStatus/**",
                        "/orders/deliveryBoy/{deliveryBoyId}"
        };

        private static final String[] ADMIN_ENDPOINTS = {
                        "/admin/**"
        };
        
        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedOrigins(List.of("http://localhost:3000"));
            configuration.setAllowedMethods(List.of("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
            configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
            configuration.setExposedHeaders(List.of("Authorization"));
            configuration.setAllowCredentials(true);
            
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", configuration);
            return source;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http.cors(withDefaults())
                                .csrf(csrf -> csrf.disable())
                                .exceptionHandling(handling -> handling.authenticationEntryPoint(authEntry))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                                                .requestMatchers(HttpMethod.OPTIONS).permitAll()
                                                .requestMatchers(HttpMethod.PATCH, "/admin/**").hasAuthority("ROLE_ADMIN") // Ensure PATCH works

                                                // Place the DELIVERY_BOY_ENDPOINTS before CUSTOMER_ENDPOINTS
                                                .requestMatchers(DELIVERY_BOY_ENDPOINTS).hasRole("DELIVERY_BOY")
                                                .requestMatchers(VENDOR_ENDPOINTS).hasRole("VENDOR")
                                                .requestMatchers(CUSTOMER_ENDPOINTS).hasRole("CUSTOMER")
//                                                .requestMatchers(ADMIN_ENDPOINTS).hasRole("ADMIN")
                                                .requestMatchers(ADMIN_ENDPOINTS).hasAuthority("ROLE_ADMIN")
                                                .anyRequest().authenticated())
                                .sessionManagement(management -> management
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
                return config.getAuthenticationManager();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }
}
