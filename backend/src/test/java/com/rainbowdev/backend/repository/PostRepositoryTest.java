package com.rainbowdev.backend.repository;

import com.rainbowdev.backend.model.Post;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.test.annotation.Rollback;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class PostRepositoryTest {

    @Autowired
    private PostRepository postRepository;

    @Test
    @Rollback(false)
    void givenPost_whenSave_thenPostIsSaved() {
        // Given
        Post post = new Post();
        post.setTitle("New Post");
        post.setContent("This is the content of the new post.");
        post.setAuthor("Author Name");

        // When
        Post savedPost = postRepository.save(post);

        // Then
        assertNotNull(savedPost);
        assertEquals("New Post", savedPost.getTitle());
    }

    @Test
    void givenPostId_whenFindById_thenReturnPost() {
        // Given: a new post is saved in the repository
        Post post = new Post();
        post.setTitle("Sample Post");
        post.setContent("This is a sample content.");
        post.setAuthor("Sample Author");
        Post savedPost = postRepository.save(post);

        // When: the saved post is retrieved by ID
        Optional<Post> retrievedPost = postRepository.findById(savedPost.getId());

        // Then: the post should be present
        assertTrue(retrievedPost.isPresent());
        assertEquals(savedPost.getId(), retrievedPost.get().getId());
    }


    @Test
    void givenPost_whenDelete_thenPostIsDeleted() {
        // Given: A new post with valid content is saved in the repository
        Post post = new Post();
        post.setTitle("Sample Post");
        post.setContent("This is valid content.");  // Content must be at least 10 characters
        post.setAuthor("Sample Author");
        Post savedPost = postRepository.save(post);

        // When: The post is deleted
        postRepository.deleteById(savedPost.getId());

        // Then: The post should no longer exist in the repository
        Optional<Post> deletedPost = postRepository.findById(savedPost.getId());
        assertFalse(deletedPost.isPresent());
    }

}
