import { inject, InjectionKey, provide } from "vue";

type NewContextFn<C> = () => C;

type ContextDefinition<C> = {
  injectionKey: InjectionKey<C>;
  newContextFn: () => C;
};

/**
 * Define a context that can be provided and used in the component hierarchy. Pass in a create
 * function that will be run as part of setup(). All Vue reactive methods such as `computed`
 * may be used.
 *
 * @example
 * export const userName = defineContext(() => {
 *   const userName = ref('');
 *   const uppercaseUserName = computed(() => userName.value.toUpperCase())
 *   const setUserName = (name) => {
 *     userName.value = name;
 *   }
 *   return {
 *     userName: readonly(userName),
 *     uppercaseUserName,
 *     setUserName,
 *   }
 * });
 *
 * @param {NewContextFn<C>} newContextFn Function that creates the context. Make it return an
 * object just as any other setup() function.
 * @returns {ContextDefinition<C>} A context definition object that is used by `provideContext`
 * and `useContext`.
 */
export function defineContext<C>(
  newContextFn: NewContextFn<C>
): ContextDefinition<C> {
  return {
    injectionKey: Symbol(),
    newContextFn,
  };
}

/**
 * Create a context that can be provided to all components in the application setup.
 *
 * @example
 * import { userName } from '@contexts/user';
 *
 * createApp(App)
 *   .provide(...createContext(userName))
 *   .mount('#app');
 *
 * @param {ContextDefinition<C>} contextDefinition The context definition object created by
 * `defineContext`.
 * @returns {[InjectionKey<C>, C]} The injection key and the newly created context.
 */
export function createContext<C>({
  injectionKey,
  newContextFn,
}: ContextDefinition<C>): [InjectionKey<C>, C] {
  return [injectionKey, newContextFn()];
}

/**
 * Provide context from a component in the hierarchy. All descendant components can then use
 * that context.
 *
 * @example
 * import { userName } from '@contexts/user';
 *
 * export default defineComponent({
 *   setup() {
 *     provideContext(userName);
 *   },
 * });
 *
 * @param {ContextDefinition<C>} contextDefinition The context definition object created by
 * `defineContext`.
 */
export function provideContext<C>(
  contextDefinition: ContextDefinition<C>
): void {
  provide(...createContext(contextDefinition));
}

/**
 * Use context from an ancestor component in the hierarchy.
 *
 * @example
 * import { userName } from '@contexts/user';
 *
 * export default defineComponent({
 *   setup() {
 *     const { uppercaseUserName, setUserName } = useContext(userName);
 *     return {
 *       uppercaseUserName,
 *       setUserName,
 *     }
 *   },
 * });
 *
 * @param {ContextDefinition<C>} contextDefinition The context definition object created by
 * `defineContext`.
 */
export function useContext<C>({ injectionKey }: ContextDefinition<C>): C {
  const context = inject(injectionKey);
  if (!context) {
    throw Error(
      "Could not inject context, was it provided in an ancestor component or from the application?"
    );
  }
  return context;
}
