package com.lch.cces

// import grails.transaction.Transactional

//@Transactional
class ImageHelper {

  // def resolveId() {
  //   println this.delegate
  //   'a'
  // }
  //
  // def resolveId(delegate) {
  //   println delegate
  //   'b'
  // }

  private ImageHelper() {
    // avoid to initiate an instance
  }

  static def resolveURI (delegate, propName, multipartFile) {
    println "class ${delegate.class} (${delegate.id}) - $propName : $multipartFile"
    'c'
  }
  static def persist(multiPartFile, delegate, propName) {
    println "class ${delegate.class} (${delegate.id}) - $propName : $multiPartFile"
    'c'
  }
}
