import React, { Component } from 'react'
import { trim, isEqual, isEmpty, map, replace } from 'lodash'
import axios from 'axios'

import { Text, Label, Button, Menu, NavItem } from 'rebass'
import { Flex } from 'reflexbox'
import { VelocityTransitionGroup } from 'velocity-react'

import Section from './Section'
import SectionHeading from './SectionHeading'

const ax = axios.create({
  baseURL: 'https://crossorigin.me/https://democracy.io/api/1'
})

class Search extends Component {
  constructor() {
    super()
    this.state = {
      address: '',
      loading: false,
      results: [],
      lat: 0,
      lng: 0
    }
    this.onKey = this.onKey.bind(this)
    this.onClick = this.onClick.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.getLegislators = this.getLegislators.bind(this)
  }

  onKey(value, keyCode, e) {
    const val = trim(value)
    if (!isEqual(val, this.state.address)) {
      this.setState({ address: val })
    }
    // When you press return
    if (isEqual(keyCode, 13)) {
      this.onClick()
    }
  }

  fetchData() {
    this.setState({ loading: true, results: [] })
    const address = replace(this.state.address, /\w+/, '+')
    ax.get(`/location/verify?address=${address}`).then(response => {
      if (!isEmpty(response.data)) {
        const lat = response.data.data.latitude
        const lng = response.data.data.longitude
        this.setState({ lat, lng })
        this.getLegislators()
      }
    })
  }

  getLegislators() {
    const { lat, lng } = this.state
    ax
      .get(`/legislators/findByLatLng?latitude=${lat}&longitude=${lng}`)
      .then(response => {
        this.setState({
          loading: false,
          results: response.data.data
        })
      })
      .catch(response => {
        console.log('error reaching sunlightfoundation')
      })
  }

  onClick(e) {
    if (!isEmpty(this.state.address)) {
      this.fetchData()
    }
  }

  render() {
    const { loading, results } = this.state
    return (
      <Section>
        <SectionHeading name="Find your legislators…" />
        <Flex align="flex-end" mb={2}>
          <div className="pr2" style={{ flex: 1 }}>
            <Label
              htmlFor="addressInput"
              style={{ lineHeight: 2 }}
              children="Enter your US address"
            />
            <input
              name="address"
              id="addressInput"
              placeholder="1 Infinite Loop, Cupertino, CA"
              onKeyDown={e => this.onKey(e.target.value, e.keyCode)}
              className="input"
            />
          </div>
          <div className="pt2">
            <Button
              bg={colors.green}
              color="white"
              inverted
              rounded
              children="Search"
              onClick={e => this.onClick(e)}
            />
          </div>
        </Flex>
        {(loading || results) &&
          <SearchResults loading={loading} results={results} />}
      </Section>
    )
  }
}

const SearchResults = ({ loading, results, ...props }) => (
  <VelocityTransitionGroup
    component="section"
    enter={{ animation: 'slideDown', duration: 256 }}
    leave={{ animation: 'slideUp', duration: 256 }}
  >
    {isEqual(loading, true) && <Text color="midgray" children="Loading…" />}
    {!isEmpty(results) && [
      <Label
        is="p"
        style={{ marginBottom: 4 }}
        children="Jump to a legislator"
        key="label"
      />,
      <Menu is="article" key="menu" style={{ maxWidth: '16rem' }} rounded>
        {map(results, r => (
          <SearchResult
            key={r.bioguideId}
            title={r.title}
            firstname={r.firstName}
            lastname={r.lastName}
            state={r.state}
          />
        ))}
      </Menu>
    ]}
  </VelocityTransitionGroup>
)

const SearchResult = ({ title, firstname, lastname, state }) => (
  <NavItem
    is="a"
    href={`#${state}-${lastname}`}
    style={{ fontWeight: 400 }}
    children={`${title} ${firstname} ${lastname}`}
  />
)

export default Search
