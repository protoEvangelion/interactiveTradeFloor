import PropTypes from 'prop-types'
import styled from 'styled-components'

export const determineColor = (filter, owner, status) => {
	if (filter === owner || filter === 'None') {
		if (status === 'holding') {
			return 'rgb(255, 216, 0)' // orange
		} else if (status === 'good') {
			return 'rgb(21, 255, 0)' // green
		} else if (status === 'collect') {
			return 'red' // red
		}
	}
	return ''
}

const StatusCircle = styled.div`
	width: 7px;
	height: 7px;
	border-radius: 50%;
	top: 3px;
	left: 3px;
	position: absolute;
	background-color: ${props => determineColor(props.filter, props.owner, props.status)};
`

StatusCircle.propTypes = {
	status: PropTypes.string,
	owner: PropTypes.string,
	filter: PropTypes.string,
}

export default StatusCircle
