package se.maokei.locpin;

import org.springframework.boot.SpringApplication;

public class TestApp {
    public static void main(String[] args) {
        SpringApplication application = App.createSpringApplication();

        // Here we add the same initializer as we were using in our tests...
        application.addInitializers(new AbstractIntegrationTest.Initializer());

        // ... and start it normally
        application.run(args);
    }
}
