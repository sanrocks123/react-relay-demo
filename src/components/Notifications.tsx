
import _ from "lodash";

export const Notification = () => {
    return (
        <div>
            <p>Notifications Panel</p>
            <p>
                {
                    _.isEmpty({ a: 'hello' }) ? "true" : "false"
                }
            </p>
        </div>
    );
}
