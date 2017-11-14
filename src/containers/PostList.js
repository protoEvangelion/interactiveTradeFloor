import { POST_LIST_READ, postListReadRequest } from 'store/actions'
import React, { Component } from 'react'
import { fromEntities, fromPost, fromStatus } from 'store/selectors'

import { PostList } from 'components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class PostListContainer extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    limit: PropTypes.number,
    loading: PropTypes.bool,
    request: PropTypes.func.isRequired,
  }

  static defaultProps = {
    limit: 20,
  }

  componentDidMount() {
    this.props.request()
  }

  render() {
    const { list, loading } = this.props
    return <PostList {...{ list, loading }} />
  }
}

const mapStateToProps = (state) => ({
  list: fromEntities.getList(state, 'post', fromPost.getList(state)),
  loading: fromStatus.isLoading(state, POST_LIST_READ),
})

const mapDispatchToProps = (dispatch, { limit }) => ({
  request: () => dispatch(postListReadRequest({ limit })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)
