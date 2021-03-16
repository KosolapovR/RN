import React from 'react';
import PropTypes from 'prop-types';

import {Column} from 'components/styled';
import Selected2faItem from 'components/blocks/Selected2faBlock/Selected2faItem';

function Selected2faBlock({items, onSelect2FA}) {
  return (
    <Column>
      {items.map((i) => (
        <Selected2faItem
          key={i.id}
          id={i.id}
          title={i.title}
          subtitle={i.subtitle}
          icon={i.icon}
          selectedIcon={i.selectedIcon}
          isSelected={i.isSelected}
          onSelect2FA={onSelect2FA}
        />
      ))}
    </Column>
  );
}

Selected2faBlock.propTypes = {
  items: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    selectedIcon: PropTypes.string.isRequired,
  }),
  onSelect2FA: PropTypes.func.isRequired,
};

export default Selected2faBlock;
