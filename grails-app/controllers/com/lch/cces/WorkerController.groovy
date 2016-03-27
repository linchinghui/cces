package com.lch.cces

import com.lch.aaa.*

class WorkerController extends BaseController<Worker> {

    static namespace = Application.NAMESPACE_API

    WorkerController() {
        super(Worker)
    }

}
