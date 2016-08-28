package com.lch.aaa

class PersistentLogins {

	String			id
	String			username	// alias of id
	String			series
	String			tokenValue
	Date			date

//	static transients = ['series']

    static constraints = {
		username	blank: false, nullable: false, maxSize: 64
		series		blank: false, nullable: false, maxSize: 64, unique: true
		tokenValue	blank: false, nullable: false, maxSize: 64
		date		blank: false, nullable: false
	}

	static mapping = {
		version		false
		sort		'date'

		id			generator: 'assigned', name: 'series'
		tokenValue	column: 'token'
		date		column: 'last_used'
    }


//	String getId() {
//		this.id
//	}
//	void setId(String id) {
//		setCode(id)
//	}

	String getSeries() {
		this.id
	}
	void setSeries(String series) {
		this.id = series
	}

	def beforeInsert() {
		if (date == null) {
			date = new Date()
		}
	}

	public String toString() {
		"${id} logged-in at ${date}"
	}

}
