import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? <Spinner /> : 
  <Fragment>
<h1 className="text-primary large">Posts</h1>
<p className="lead ">
  <i className="fas fa-user"></i> Welcome to the community
</p>
{/*AddPostFrom */}
<PostForm/>
{/*PostFrom */}
<div className="posts">
  {posts.map(post=>
    <PostItem key={post._id} post={post}/>
  )}
</div>

  </Fragment>
}
    



Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post, // 这里修正了 `posts:state.posts` 的错误
});

export default connect(mapStateToProps, { getPosts })(Posts);
