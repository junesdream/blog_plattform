//package com.rainbowdev.backend.service;
//
//import com.rainbowdev.backend.model.Post;
//import com.rainbowdev.backend.repository.PostRepository;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//
//public class PostServiceTest {
//
//    @Mock
//    private PostRepository postRepository;
//
//    @InjectMocks
//    private PostService postService;
//
//    @BeforeEach
//    public void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    public void testGetAllPosts() {
//        Post post1 = new Post();
//        post1.setId(1L);
//        post1.setTitle("Test Title 1");
//        post1.setContent("This is a test content 1.");
//        post1.setAuthor("Test Author 1");
//
//        Post post2 = new Post();
//        post2.setId(2L);
//        post2.setTitle("Test Title 2");
//        post2.setContent("This is a test content 2.");
//        post2.setAuthor("Test Author 2");
//
//        List<Post> posts = Arrays.asList(post1, post2);
//
//        when(postRepository.findAll()).thenReturn(posts);
//
//        List<Post> result = postService.getAllPosts();
//
//        assertEquals(2, result.size());
//        assertEquals("Test Title 1", result.get(0).getTitle());
//        assertEquals("Test Title 2", result.get(1).getTitle());
//    }
//
//    @Test
//    public void testGetPostById() {
//        Post post = new Post();
//        post.setId(1L);
//        post.setTitle("Test Title");
//        post.setContent("This is a test content.");
//        post.setAuthor("Test Author");
//
//        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
//
//        Post result = postService.getPostById(1L);
//
//        assertNotNull(result);
//        assertEquals("Test Title", result.getTitle());
//    }
//
//    @Test
//    public void testCreatePost() {
//        Post post = new Post();
//        post.setTitle("Test Title");
//        post.setContent("This is a test content.");
//        post.setAuthor("Test Author");
//
//        when(postRepository.save(post)).thenReturn(post);
//
//        Post result = postService.createPost(post);
//
//        assertNotNull(result);
//        assertEquals("Test Title", result.getTitle());
//    }
//
//    @Test
//    public void testUpdatePost() {
//        Post existingPost = new Post();
//        existingPost.setId(1L);
//        existingPost.setTitle("Old Title");
//        existingPost.setContent("Old Content");
//        existingPost.setAuthor("Old Author");
//
//        Post updatedPost = new Post();
//        updatedPost.setTitle("New Title");
//        updatedPost.setContent("New Content");
//        updatedPost.setAuthor("New Author");
//
//        when(postRepository.findById(1L)).thenReturn(Optional.of(existingPost));
//        when(postRepository.save(existingPost)).thenReturn(existingPost);
//
//        Post result = postService.updatePost(1L, updatedPost);
//
//        assertNotNull(result);
//        assertEquals("New Title", result.getTitle());
//        assertEquals("New Content", result.getContent());
//        assertEquals("New Author", result.getAuthor());
//    }
//
//    @Test
//    public void testDeletePost() {
//        doNothing().when(postRepository).deleteById(1L);
//
//        postService.deletePost(1L);
//
//        verify(postRepository, times(1)).deleteById(1L);
//    }
//}