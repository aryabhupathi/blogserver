// {post && (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>
//       <div>
//         <h2>Comments</h2>
//         {comments.map((comment) => (
//           <div key={comment._id}>
//             <p>{comment.content} - by {comment.author ? comment.author.name : "Anonymous"}</p>
//             <div>
//               <h4>Replies:</h4>
//               {comment.replies && comment.replies.length > 0 ? (
//                 comment.replies.map((reply) => (
//                   <div key={reply._id}>
//                     <p>{reply.content} - by {reply.author ? reply.author.name : "Anonymous"}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p>No replies yet.</p>
//               )}
//               <textarea
//                 value={newReplyContent}
//                 onChange={(e) => setNewReplyContent(e.target.value)}
//                 placeholder="Write a reply..."
//               />
//               <button onClick={() => handleReplySubmit(comment._id)}>Post Reply</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )}

// import React, { useState, useEffect } from "react";
// import { Button, Card, CardContent, Typography, TextField, List, ListItem, ListItemText } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext";

// const PostDetails = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [newReply, setNewReply] = useState("");
//   const [replyToCommentId, setReplyToCommentId] = useState(null);
//   const { user, token } = useAuth();

//   useEffect(() => {
//     const fetchPostDetails = async () => {
//       try {
//         const postResponse = await fetch(`http://localhost:5000/api/post/${id}`);
//         const postData = await postResponse.json();
//         setPost(postData.post);
//         setComments(postData.comments);
//       } catch (error) {
//         console.error("Error fetching post details:", error);
//       }
//     };
//     fetchPostDetails();
//   }, [id]);

//   const handleAddComment = async () => {
//     if (!user || !token) {
//       alert("Please log in to add a comment");
//       return;
//     }
//     if (newComment.trim()) {
//       try {
//         const response = await fetch(`http://localhost:5000/api/comment/${id}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ content: newComment, post: id, author: user.userId }),
//         });
//         if (response.ok) {
//           setNewComment("");
//           const data = await response.json();
//           setComments([data, ...comments]);
//         } else {
//           throw new Error("Failed to add comment");
//         }
//       } catch (error) {
//         console.error("Error adding comment:", error);
//       }
//     }
//   };
// console.log(comments, 'nrnrnrnnrnrn');
//   const handleAddReply = async () => {
//     if (!user || !token) {
//       alert("Please log in to add a reply");
//       return;
//     }
//     if (newReply.trim()) {
//       try {
//         const response = await fetch(`http://localhost:5000/api/reply/${replyToCommentId}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ content: newReply, comment: replyToCommentId, author: user.userId }),
//         });
//         if (response.ok) {
//           setNewReply("");
//           setReplyToCommentId(null);
//           const data = await response.json();
//           setComments((prevComments) =>
//             prevComments.map((comment) =>
//               comment._id === replyToCommentId
//                 ? { ...comment, replies: Array.isArray(comment.replies) ? [...comment.replies, data.reply] : [data.reply] }
//                 : comment
//             )
//           );
//         } else {
//           throw new Error("Failed to add reply");
//         }
//       } catch (error) {
//         console.error("Error adding reply:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       {post && (
//         <Card>
//           <CardContent>
//             <Typography variant="h4">{post.title}</Typography>
//             <Typography variant="body1">{post.content}</Typography>
//           </CardContent>
//         </Card>
//       )}
//       <div>
//         <Typography variant="h6">Comments</Typography>
//         <TextField
//           fullWidth
//           label="Add a comment"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <Button variant="contained" onClick={handleAddComment}>Add Comment</Button>

//         <List>
//           {comments.map((comment) => (
//             <ListItem key={comment._id}>
//               <ListItemText primary={comment.content} />
//               <Button onClick={() => setReplyToCommentId(comment._id)}>Reply</Button>

//               {/* Ensure that comment.replies is always an array */}
//               {Array.isArray(comment.replies) && comment.replies.map((reply) => (
//                 <ListItem key={reply._id}>
//                   <ListItemText primary={reply.content} />
//                 </ListItem>
//               ))}
//             </ListItem>
//           ))}
//         </List>

//         {replyToCommentId && (
//           <div>
//             <TextField
//               fullWidth
//               label="Add a reply"
//               value={newReply}
//               onChange={(e) => setNewReply(e.target.value)}
//             />
//             <Button variant="contained" onClick={handleAddReply}>Add Reply</Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostDetails;





// import React, { useState, useEffect } from "react";
// import { Button, Card, CardContent, Typography, TextField, List, ListItem, ListItemText } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext";

// const PostDetails = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [newReply, setNewReply] = useState("");
//   const [replyToCommentId, setReplyToCommentId] = useState(null);
//   const { user, token } = useAuth();

//   useEffect(() => {
//     const fetchPostDetails = async () => {
//       try {
//         const postResponse = await fetch(`http://localhost:5000/api/post/${id}`);
//         const postData = await postResponse.json();
//         setPost(postData.post);
//         setComments(postData.comments || []); // Ensure comments is an array
//       } catch (error) {
//         console.error("Error fetching post details:", error);
//       }
//     };
//     fetchPostDetails();
//   }, [id]);

//   const handleAddComment = async () => {
//     if (!user || !token) {
//       alert("Please log in to add a comment");
//       return;
//     }
//     if (newComment.trim()) {
//       try {
//         const response = await fetch(`http://localhost:5000/api/comment/${id}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ content: newComment, post: id, author: user.userId }),
//         });
//         if (response.ok) {
//           setNewComment("");
//           const data = await response.json();
//           setComments([data, ...comments]);
//         } else {
//           throw new Error("Failed to add comment");
//         }
//       } catch (error) {
//         console.error("Error adding comment:", error);
//       }
//     }
//   };

// //  const handleAddReply = async () => {
// //     if (!user || !token) {
// //       alert("Please log in to add a reply");
// //       return;
// //     }
// //     if (newReply.trim()) {
// //       try {
// //         const response = await fetch(`http://localhost:5000/api/reply/${replyToCommentId}`, {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`,
// //           },
// //           body: JSON.stringify({
// //             content: newReply,
// //             comment: replyToCommentId,  // The comment being replied to
// //             author: user.userId,
// //             replyToComment: replyToCommentId,  // Pass the reply's parent comment ID
// //           }),
// //         });
  
// //         if (response.ok) {
// //           setNewReply("");
// //           setReplyToCommentId(null);
// //           const data = await response.json();
// //           setComments((prevComments) =>
// //             prevComments.map((comment) =>
// //               comment._id === replyToCommentId
// //                 ? { ...comment, replies: Array.isArray(comment.replies) ? [...comment.replies, data.reply] : [data.reply] }
// //                 : comment
// //             )
// //           );
// //         } else {
// //           throw new Error("Failed to add reply");
// //         }
// //       } catch (error) {
// //         console.error("Error adding reply:", error);
// //       }
// //     }
// //   };
  
// const handleAddReply = async () => {
//   if (!user || !token) {
//     alert("Please log in to add a reply");
//     return;
//   }
//   if (newReply.trim()) {
//     try {
//       const response = await fetch(`http://localhost:5000/api/reply/${replyToCommentId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           content: newReply,
//           comment: replyToCommentId,  // The comment being replied to
//           author: user.userId,
//           replyToComment: replyToCommentId,  // Pass the reply's parent comment ID
//         }),
//       });

//       if (response.ok) {
//         setNewReply("");  // Reset the new reply input field
//         setReplyToCommentId(null);  // Reset the reply state to null

//         const data = await response.json();

//         // Update the comments state to include the new reply
//         setComments((prevComments) =>
//           prevComments.map((comment) =>
//             comment._id === replyToCommentId
//               ? { ...comment, replies: [...(comment.replies || []), data.reply] }
//               : comment
//           )
//         );
//       } else {
//         throw new Error("Failed to add reply");
//       }
//     } catch (error) {
//       console.error("Error adding reply:", error);
//     }
//   }
// };

//   console.log(comments, 'lllllllllllll');

//   return (
//     <div>
//       {post && (
//         <Card>
//           <CardContent>
//             <Typography variant="h4">{post.title}</Typography>
//             <Typography variant="body1">{post.content}</Typography>
//           </CardContent>
//         </Card>
//       )}
//       <div>
//         <Typography variant="h6">Comments</Typography>
//         <TextField
//           fullWidth
//           label="Add a comment"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <Button variant="contained" onClick={handleAddComment}>Add Comment</Button>
//         <List>
//   {comments.map((comment) => (
//     <ListItem key={comment._id}>
//       <ListItemText primary={comment.content || 'No content available'} />
//       <Button onClick={() => setReplyToCommentId(comment._id)}>Reply</Button>

//       {/* Display replies for the comment */}
//       {Array.isArray(comment.replies) && comment.replies.length > 0 ? (
//         comment.replies.map((reply) => (
//           <ListItem key={reply._id}>
//             <ListItemText primary={reply.content || 'No content available'} />
//           </ListItem>
//         ))
//       ) : (
//         <Typography variant="body2" color="textSecondary">No replies yet.</Typography>
//       )}
//     </ListItem>
//   ))}
// </List>


//         {replyToCommentId && (
//           <div>
//             <TextField
//               fullWidth
//               label="Add a reply"
//               value={newReply}
//               onChange={(e) => setNewReply(e.target.value)}
//             />
//             <Button variant="contained" onClick={handleAddReply}>Add Reply</Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostDetails;



// import React, { useState, useEffect } from "react";
// import { Button, Card, CardContent, Typography, TextField, List, ListItem, ListItemText } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext";

// const PostDetails = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [newReply, setNewReply] = useState("");
//   const [replyToCommentId, setReplyToCommentId] = useState(null);
//   const { user, token } = useAuth();

//   useEffect(() => {
//     const fetchPostDetails = async () => {
//       try {
//         const postResponse = await fetch(`http://localhost:5000/api/post/${id}`);
//         const postData = await postResponse.json();
//         setPost(postData.post);
//         setComments(postData.comments || []); // Ensure comments is an array
//       } catch (error) {
//         console.error("Error fetching post details:", error);
//       }
//     };
//     fetchPostDetails();
//   }, [id]);

//   const handleAddComment = async () => {
//     if (!user || !token) {
//       alert("Please log in to add a comment");
//       return;
//     }
//     if (newComment.trim()) {
//       try {
//         const response = await fetch(`http://localhost:5000/api/comment/${id}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ content: newComment, post: id, author: user.userId }),
//         });
//         if (response.ok) {
//           setNewComment("");
//           const data = await response.json();
//           setComments([data, ...comments]); // Update the comments state with the new comment
//         } else {
//           throw new Error("Failed to add comment");
//         }
//       } catch (error) {
//         console.error("Error adding comment:", error);
//       }
//     }
//   };

//   const handleAddReply = async () => {
//     if (!user || !token) {
//       alert("Please log in to add a reply");
//       return;
//     }
//     if (newReply.trim()) {
//       try {
//         const response = await fetch(`http://localhost:5000/api/reply/${replyToCommentId}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             content: newReply,
//             comment: replyToCommentId,  // The comment being replied to
//             author: user.userId,
//             replyToComment: replyToCommentId,  // Pass the reply's parent comment ID
//           }),
//         });

//         if (response.ok) {
//           setNewReply("");  // Reset the new reply input field
//           setReplyToCommentId(null);  // Reset the reply state to null

//           const data = await response.json();
          
//           // Update the comments state to include the new reply in the correct comment
//           setComments((prevComments) =>
//             prevComments.map((comment) =>
//               comment._id === replyToCommentId
//                 ? { ...comment, replies: [...(comment.replies || []), data.reply] }
//                 : comment
//             )
//           );
//         } else {
//           throw new Error("Failed to add reply");
//         }
//       } catch (error) {
//         console.error("Error adding reply:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       {post && (
//         <Card>
//           <CardContent>
//             <Typography variant="h4">{post.title}</Typography>
//             <Typography variant="body1">{post.content}</Typography>
//           </CardContent>
//         </Card>
//       )}
//       <div>
//         <Typography variant="h6">Comments</Typography>
//         <TextField
//           fullWidth
//           label="Add a comment"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//         />
//         <Button variant="contained" onClick={handleAddComment}>Add Comment</Button>

//         <List>
//           {comments.map((comment) => (
//             <ListItem key={comment._id}>
//               <ListItemText primary={comment.content || 'No content available'} />
//               <Button onClick={() => setReplyToCommentId(comment._id)}>Reply</Button>

//               {/* Display replies for the comment */}
//               {Array.isArray(comment.replies) && comment.replies.length > 0 ? (
//                 comment.replies.map((reply) => (
//                   <ListItem key={reply._id}>
//                     <ListItemText primary={reply.content || 'No content available'} />
//                   </ListItem>
//                 ))
//               ) : (
//                 <Typography variant="body2" color="textSecondary">No replies yet.</Typography>
//               )}
//             </ListItem>
//           ))}
//         </List>

//         {replyToCommentId && (
//           <div>
//             <TextField
//               fullWidth
//               label="Add a reply"
//               value={newReply}
//               onChange={(e) => setNewReply(e.target.value)}
//             />
//             <Button variant="contained" onClick={handleAddReply}>Add Reply</Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostDetails;




import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography, TextField, List, ListItem, ListItemText } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [replies, setreplies] = useState([])
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState(null);

  const [newReplyContent, setNewReplyContent] = useState("");
  const { user, token } = useAuth();

  // useEffect(() => {
  //   const fetchPostDetails = async () => {
  //     try {
  //       const postResponse = await fetch(`http://localhost:5000/api/post/${id}`);
  //       const postData = await postResponse.json();

  //       console.log(postData, 'pdpdpdpdppdpdpdpdppdpd')
  //       setPost(postData.post);
  //       setComments(postData.comments || []); // Ensure comments is an array
  //       setreplies(postData.comments.reply)
  //     } catch (error) {
  //       console.error("Error fetching post details:", error);
  //     }
  //   };
  //   fetchPostDetails();
  // }, [id]);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/post/${id}`);
        if (!response.ok) {
          throw new Error("Error fetching post details");
        }
        const data = await response.json();
        setPost(data.post);
        setComments(data.comments); // Set comments with replies
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [id]);
  const handleAddComment = async () => {
    if (!user || !token) {
      alert("Please log in to add a comment");
      return;
    }
    if (newComment.trim()) {
      try {
        const response = await fetch(`http://localhost:5000/api/comment/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newComment, post: id, author: user.userId }),
        });
        if (response.ok) {
          setNewComment("");
          const data = await response.json();
          setComments([data, ...comments]); // Update the comments state with the new comment
        } else {
          throw new Error("Failed to add comment");
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleAddReply = async () => {
    if (!user || !token) {
      alert("Please log in to add a reply");
      return;
    }
    if (newReply.trim()) {
      try {
        const response = await fetch(`http://localhost:5000/api/reply/${replyToCommentId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: newReply,
            comment: replyToCommentId,  // The comment being replied to
            author: user.userId,
            replyToComment: replyToCommentId,  // Pass the reply's parent comment ID
          }),
        });

        if (response.ok) {
          setNewReply("");  // Reset the new reply input field
          setReplyToCommentId(null);  // Reset the reply state to null

          const data = await response.json();
          
          // Update the comments state to include the new reply in the correct comment
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment._id === replyToCommentId
                ? { ...comment, replies: [...(comment.replies || []), data.reply] }
                : comment
            )
          );
        } else {
          throw new Error("Failed to add reply");
        }
      } catch (error) {
        console.error("Error adding reply:", error);
      }
    }
  };

  const handleReplySubmit = async (commentId) => {
    try {
      const response = await fetch(`/api/replies/${commentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newReplyContent,
          author: "currentUserId", // Replace with the logged-in user's ID
        }),
      });
      if (!response.ok) {
        throw new Error("Error adding reply");
      }
      const data = await response.json();
      const updatedComments = comments.map(comment => {
        if (comment._id === commentId) {
          return { ...comment, replies: [...comment.replies, data.reply] };
        }
        return comment;
      });
      setComments(updatedComments); // Update state with new reply
      setNewReplyContent(""); // Clear reply input
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };


  return (
    <div>
      {post && (
        <Card>
          <CardContent>
            <Typography variant="h4">{post.title}</Typography>
            <Typography variant="body1">{post.content}</Typography>
          </CardContent>
        </Card>
      )}
      <div>
        <Typography variant="h6">Comments</Typography>
        <TextField
          fullWidth
          label="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddComment}>Add Comment</Button>

        <List>
          {comments.map((comment) => (
            <ListItem key={comment._id}>
              {/* <ListItemText primary={comment.content || 'No content available'} /> */}
              
            <p>{comment.content} - by {comment.author ? comment.author.name : "Anonymous"}</p>
              <Button onClick={() => setReplyToCommentId(comment._id)}>Reply</Button>

              <h4>Replies:</h4>
              {comment.replies && comment.replies.length > 0 ? (
                comment.replies.map((reply) => (
                  <div key={reply._id}>
                    <p>{reply.content} - by {reply.author ? reply.author.name : "Anonymous"}</p>
                  </div>
                ))
              ) : (
                <p>No replies yet.</p>
              )}
              {/* Display replies for the comment */}
              
            </ListItem>
          ))}
        </List>

        {replyToCommentId && (
          <div>
            <TextField
              fullWidth
              label="Add a reply"
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
            />
            <Button variant="contained" onClick={handleAddReply}>Add Reply</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
