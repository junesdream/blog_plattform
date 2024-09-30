package com.rainbowdev.backend.model;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import jakarta.validation.ConstraintViolation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PostTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        // Given
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void whenPostIsValid_thenNoViolations() {
        // Given
        Post post = new Post();
        post.setTitle("Valid Title");
        post.setContent("Valid content with more than 10 characters");
        post.setAuthor("Valid Author");

        // When: validate object
        Set<ConstraintViolation<Post>> violations = validator.validate(post);

        // Then: ot should be no validate errors
        assertThat(violations).isEmpty();
    }

    @Test
    void whenTitleIsBlank_thenValidationFails() {
        // Given: Ein Post-Objekt mit leerem Titel
        Post post = new Post();
        post.setTitle("");
        post.setContent("Valid content with more than 10 characters");
        post.setAuthor("Valid Author");

        // When: we validate the object
        Set<ConstraintViolation<Post>> violations = validator.validate(post);

        // Then: tow validate errors should be found
        assertThat(violations).hasSize(2);

        // Errorreport extracts the messages
        Set<String> messages = violations.stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.toSet());

        // to sure that the messages are correct
        assertThat(messages).containsExactlyInAnyOrder(
                "Title is mandatory",
                "Title must be between 5 and 100 characters"
        );
    }


    @Test
    void whenTitleIsTooShort_thenValidationFails() {
        // Given: Ein Post-Objekt mit zu kurzem Titel
        Post post = new Post();
        post.setTitle("1234");
        post.setContent("Valid content with more than 10 characters");
        post.setAuthor("Valid Author");

        // When:  we validate the object
        Set<ConstraintViolation<Post>> violations = validator.validate(post);

        // Then: Iht should be huted validate errors, da `@Size`-Validierung  for the title
        assertThat(violations).hasSize(1);
        ConstraintViolation<Post> violation = violations.iterator().next();
        assertThat(violation.getPropertyPath().toString()).isEqualTo("title");
        assertThat(violation.getMessage()).isEqualTo("Title must be between 5 and 100 characters");
    }

    @Test
    public void whenTitleIsBlank_thenValidationFailsups() {
        // Given: A Objekt with emnpty title
        Post post = new Post();
        post.setTitle("");  // Leerer Titel, verletzt @NotBlank und @Size
        post.setContent("Valid content with more than 10 characters");
        post.setAuthor("Valid Author");

        // When: Validate with post object
        Set<ConstraintViolation<Post>> violations = validator.validate(post);

        // Then: expect two validate errors
        assertEquals(2, violations.size());

        // Check, if the specific validate errors exist
        Set<String> messages = violations.stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.toSet());

        assertTrue(messages.contains("Title is mandatory"));
        assertTrue(messages.contains("Title must be between 5 and 100 characters"));
    }



    @Test
    void whenTitleIsBlank_thenMultipleValidationFailures() {
        // Given
        Post post = new Post();
        post.setTitle("");  // Leer
        post.setContent("Valid content with more than 10 characters");
        post.setAuthor("Valid Author");

        // When
        Set<ConstraintViolation<Post>> violations = validator.validate(post);

        // Then
        assertThat(violations).hasSize(2);

        // Optional
        assertThat(violations)
                .extracting(ConstraintViolation::getMessage)
                .contains("Title is mandatory", "Title must be between 5 and 100 characters");
    }
}
