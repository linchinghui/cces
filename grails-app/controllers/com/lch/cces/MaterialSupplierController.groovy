package com.lch.cces

import com.lch.aaa.Application
import com.lch.aaa.BaseController

class MaterialSupplierController extends BaseController<MaterialSupplier> {

    static namespace = Application.NAMESPACE_API

    MaterialSupplierController() {
        super(MaterialSupplier)
    }

    private void resolveParameters(params) {
        def compIds = params?.id?.split('\\|')

        if (compIds?.size() >= 1) {
            if (compIds[0] != 'null') {
                if (params?.materialId == null) {
                    params['materialId'] = compIds[0]
                }
            } else {
                params.remove('id') // to identify 'CREATE'
            }

            if (compIds?.size() >= 2 && compIds[1] != 'null' && params?.supplierId == null) {
                params['supplierId'] = compIds[1]
            }
            if (compIds?.size() >= 3 && compIds[2] != 'null' && params?.brand == null) {
                params['brand'] = compIds[2]
            }
        }
    }

    private List<MaterialSupplier> listAllSuppliers(Map params) {
        // log.debug "list material-supplier(s): ${params}"
        if (params?.embed == 'true') { // list all
            params.remove('max')
            params.remove('offset')
        }
        resolveParameters(params)

        return MaterialSupplier.where {
            if (params?.materialId) { material.id == params.materialId }
            if (params?.supplierId) { supplier.id == params.supplierId }
            if (params?.brand)      { brand       == params.brand }
        }.list(params)
    }

    protected final List<MaterialSupplier> listAllResources(Map params) {
        listAllSuppliers(params)
    }

    protected final MaterialSupplier queryForResource(Serializable id) {
        listAllSuppliers(params)[0]
    }

    protected final MaterialSupplier createResource(Map params) {
        resolveParameters(params)
        def props = params

        if (params?.materialId &&
            params?.materialId != 'null') {
            props.material = Material.get(params.materialId)
            props.remove('materialId')
        }
        if (params?.supplierId &&
            params?.supplierId != 'null') {
            props.supplier = Supplier.get(params.supplierId)
            props.remove('supplierId')
        }

        return resource.newInstance(props)
    }

    protected final MaterialSupplier createResource() {
        return createResource(params)
    }

    def edit() {
        resolveParameters(params)

        if (params?.id) {
            super.edit()

        } else {
            // redirect action: 'create', params: params
			def url = g.createLink action: 'create', params: params
            redirect url: url
        }
    }

}
