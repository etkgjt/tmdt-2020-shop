import _ from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
function useDebounce(cb = () => {}, delay = 0) {
	const options = {
		leading: false,
		trailing: true,
	};
	const inputsRef = useRef(cb);
	const isMounted = useIsMounted();
	useEffect(() => {
		inputsRef.current = { cb, delay };
	});
	return useCallback(
		_.debounce(
			(...args) => {
				if (inputsRef.current.delay === delay && isMounted())
					inputsRef.current.cb(...args);
			},
			delay,
			options
		),
		[delay, _.debounce]
	);
}
function useIsMounted() {
	const isMountedRef = useRef(true);
	useEffect(() => {
		return () => {
			isMountedRef.current = false;
		};
	}, []);
	return () => isMountedRef.current;
}
export default useDebounce;
