import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import { useParams } from 'react-router-dom'; // 引入 useParams
import Spinner from '../layout/Spinner';
import PostItem from '../Posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }}) => {
    const { id } = useParams(); // 从 URL 获取 post id

    useEffect(() => {
        getPost(id);
    }, [getPost, id]);

    return loading || !post ? <Spinner /> : 
    <Fragment>
        <Link to ="/posts" className='btn'> BACK To Posts</Link>
        <PostItem post ={post} showActions={false}/>
   <CommentForm postId={id}/>
   <div className="comments">
    {post.comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} postId={id} />
    ))}
</div>
    </Fragment>;
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
