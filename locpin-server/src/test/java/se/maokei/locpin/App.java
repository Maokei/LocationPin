package se.maokei.locpin;

import org.springframework.boot.SpringApplication;

public class App {

    public static void main(String[] args) {
        createSpringApplication().run(args);
    }

    public static SpringApplication createSpringApplication() {
        return new SpringApplication(Application.class);
    }
}
