import React from 'react';

export const BoxWrapper = (props) => 
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">{props.title}</h6>
        </div>
        <div class="card-body">
            <div class="text-center">
                {props.children}
            </div>
        </div>
    </div>