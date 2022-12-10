package se.maokei.locpin.web.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import se.maokei.locpin.AbstractIntegrationTest;
import se.maokei.locpin.repository.UserRepository;

import javax.persistence.EntityManager;

@AutoConfigureMockMvc
public class UserControllerTest extends AbstractIntegrationTest {
    private final String baseUrl = "/api/user";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    EntityManager em;

    @Autowired
    UserRepository userRepository;

    @Test
    public void usernameAvailableTest() throws Exception {
        String endpoint = baseUrl + "/checkUsernameAvailability";
        String username = "EvilBob";
        mockMvc.perform(
                MockMvcRequestBuilders
                    .get(endpoint)
                    .param("username",username)
        ).andExpect(MockMvcResultMatchers.status().is(HttpStatus.OK.value()));
    }

    @Test
    public void usernameNotAvailableTest() throws Exception {
        String endpoint = baseUrl + "/checkUsernameAvailability";
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
