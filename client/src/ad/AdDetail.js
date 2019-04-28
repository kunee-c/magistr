/**
 * Created by kunee on 26/04/2019.
 */
import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import {
    Grid
} from '@material-ui/core'

class AdDetail extends Component {

    render() {

        return (
            <>
            <Grid container justify="center" spacing={16}>
                <Grid item xs={6}>
                    <Grid container justify="center" spacing={16}>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Marine - Spanish Teacher
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean convallis placerat
                                tellus.
                                Pellentesque nibh urna, aliquet fermentum arcu ut, interdum mattis nisl. Maecenas id
                                lacus
                                et dolor tincidunt consequat. Sed laoreet magna egestas turpis faucibus, eu convallis
                                nulla
                                faucibus. Aliquam erat volutpat. Vivamus sollicitudin malesuada posuere. In eu risus
                                quis
                                dui dignissim molestie. Pellentesque quis lobortis ipsum. Nullam vestibulum tortor
                                lorem, id
                                congue turpis egestas porttitor. Integer iaculis nisl arcu, ut placerat nisl vehicula
                                sed.
                                Nam finibus lacinia leo quis aliquam. Proin nisi felis, tempus eu mattis in, pulvinar
                                quis
                                sem. Vivamus at vestibulum diam. Sed vitae urna magna. Sed faucibus, felis eu sodales
                                pellentesque, leo magna bibendum nulla, imperdiet sodales quam neque et tellus. Nunc
                                viverra
                                nibh a ultricies ultricie
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justify="center" spacing={16}>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </>
        )
    }
}

export default AdDetail;