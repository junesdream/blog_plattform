package com.rainbowdev.backend.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void givenProtectedEndpoint_whenAccessWithoutAuth_thenRedirectToLogin() throws Exception {
        mockMvc.perform(get("/api/secure"))
                .andExpect(status().isFound());
    }

    @Test
    @WithMockUser
    void givenProtectedEndpoint_whenAccessWithAuth_thenOk() throws Exception {
        mockMvc.perform(get("/api/secure"))
                .andExpect(status().isNotFound());
    }

    @Test
    void givenPublicEndpoint_whenAccessWithoutAuth_thenOk() throws Exception {
        mockMvc.perform(get("/api/posts"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void givenPublicEndpoint_whenAccessWithAuth_thenOk() throws Exception {
        mockMvc.perform(get("/api/posts"))
                .andExpect(status().isOk());
    }
}
