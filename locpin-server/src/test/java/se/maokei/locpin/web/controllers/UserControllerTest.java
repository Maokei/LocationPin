package se.maokei.locpin.web.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.testcontainers.junit.jupiter.Testcontainers;
import se.maokei.locpin.repository.UserRepository;

import javax.persistence.EntityManager;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {
    private String baseUrl = "";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    EntityManager em;

    @Autowired
    UserRepository userRepository;

    @Test
    public void usernameAvailableTest() throws Exception {
        String endpoint = "/api/user/checkUsernameAvailability";
        String username = "EvilBob";
        mockMvc.perform(
                MockMvcRequestBuilders
                    .get(endpoint)
                    .param("username",username)
        ).andExpect(MockMvcResultMatchers.status().is(HttpStatus.OK.value()));
    }

    @Test
    public void usernameNotAvailableTest() throws Exception {
        String endpoint = "/api/user/checkUsernameAvailability";
        String username = "blackcat";
        //em.persist(new User("bob", username, "email@email.com", "pw123"));
        //userRepository.save(new User("bob", username, "email@email.com", "pw123"));
        mockMvc.perform(
                MockMvcRequestBuilders
                        .get(endpoint)
                        .param("username",username)
        ).andExpect(MockMvcResultMatchers.status().is(HttpStatus.OK.value()));
    }
}
