package se.maokei.locpin.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.Assert;
import org.springframework.web.context.WebApplicationContext;
import se.maokei.locpin.model.User;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {
    @Autowired
    WebApplicationContext context;
    @Autowired
    private ObjectMapper om;
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void registerUserTest() throws Exception {
        String url = "/api/auth/signup";
        User testUser = new User();
        testUser.setEmail("testuser@fakeemail.com");
        testUser.setName("Ginger Bread");
        testUser.setUsername("Doggiebox");
        testUser.setPassword("1337#t");
        //Json payload
        String payload = om.writeValueAsString(testUser);
        //Perform test
        MvcResult result = mockMvc.perform(
                MockMvcRequestBuilders.post(url)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(payload)
        ).andExpect(status().isCreated()).andReturn();
        Assert.isTrue(
                result.getResponse()
                        .getContentAsString()
                        .contains("success\":true,\"message\":\"User registered successfully"),
                "Bad response from registration"
                );
    }
}
