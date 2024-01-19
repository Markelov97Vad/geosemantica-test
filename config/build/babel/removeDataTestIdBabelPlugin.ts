import { PluginItem } from "@babel/core";

function removeDataTestIdBabelPlugin(): PluginItem {
  return {
    visitor: { // ноды которые собираемся искать
      Program(path, state) {
        const forbiddenProps = state.opts.props || []; // пропсы, которые будут удаляться

        path.traverse({
          JSXIdentifier(current) { // индентификатор jsx
            const nodeName = current.node.name; // получили название ноды
            // console.log('NODE',current.parentPath);
            if(forbiddenProps.includes(nodeName)) {
              current.parentPath.remove(); // если 'data-testid' найден, то удалить
            }
          }
        })
      }
    }
  }
}

export default removeDataTestIdBabelPlugin;